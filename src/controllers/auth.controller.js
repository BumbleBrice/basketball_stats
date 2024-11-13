import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        // Validation des données
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('auth/register', {
                title: 'Inscription',
                error: errors.array()[0].msg,
                form: req.body,
                scripts: ['auth']
            });
        }

        const { firstname, lastname, email, password } = req.body;

        // Vérifier si l'email existe déjà
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.render('auth/register', {
                title: 'Inscription',
                error: 'Cet email est déjà utilisé',
                form: req.body,
                scripts: ['auth']
            });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        await UserModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // Rediriger vers la page de succès
        res.render('auth/register-success', {
            title: 'Inscription réussie',
            user: { firstname, email },
            scripts: ['auth']
        });

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.render('auth/register', {
            title: 'Inscription',
            error: 'Une erreur est survenue lors de l\'inscription',
            form: req.body,
            scripts: ['auth']
        });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('auth/login', {
                title: 'Connexion',
                error: errors.array()[0].msg,
                form: req.body,
                scripts: ['auth']
            });
        }

        const { email, password } = req.body;

        // Rechercher l'utilisateur
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.render('auth/login', {
                title: 'Connexion',
                error: 'Email ou mot de passe incorrect',
                form: { email },
                scripts: ['auth']
            });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('auth/login', {
                title: 'Connexion',
                error: 'Email ou mot de passe incorrect',
                form: { email },
                scripts: ['auth']
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('Configuration JWT manquante');
        }

        // Créer le token JWT
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );

        // Configurer le cookie sécurisé
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });

        res.redirect('/');

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.render('auth/login', {
            title: 'Connexion',
            error: 'Une erreur est survenue lors de la connexion',
            form: req.body,
            scripts: ['auth']
        });
    }
};

export const logout = async (req, res) => {
    console.log('Tentative de déconnexion');
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0)
        });
        console.log('Cookie supprimé');
        res.redirect('/');
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la déconnexion' 
        });
    }
};
