import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'El usuario no existe.' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Email o contraseña incorrectos.' },
        { status: 401 }
      );
    }

    const userData = {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      cc: user.cc
    };

    return NextResponse.json({ user: userData, token: 'fake-jwt-token' }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

