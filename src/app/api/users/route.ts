import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendWelcomeEmail } from '@/lib/nodemailer';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}).select('-password');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();

    // Validar si existe cedula o correo
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { cc: data.cc }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'El usuario con ese email o documento ya existe' },
        { status: 400 }
      );
    }

    const newUser = await User.create(data);

    // Enviar correo de bienvenida
    await sendWelcomeEmail(newUser.email, newUser.nombre, data.password);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: error.message || 'Error al crear usuario' }, { status: 500 });
  }
}

