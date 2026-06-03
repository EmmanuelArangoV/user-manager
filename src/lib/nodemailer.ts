import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (email: string, nombre: string, passwordPlan: string) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: '¡BIENVENIDO A USER MANAGER!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F0EAD6; padding: 40px; color: #000;">
        <div style="background-color: #FF00FF; border: 4px solid #000; box-shadow: 8px 8px 0px #000; padding: 30px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: #fff; margin: 0; font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px;">¡HOLA, ${nombre}!</h1>
        </div>
        
        <div style="background-color: #fff; border: 4px solid #000; box-shadow: 8px 8px 0px #000; padding: 40px;">
          <p style="font-size: 18px; font-weight: bold; line-height: 1.5; text-transform: uppercase; margin-top: 0;">Es un placer tenerte en la plataforma de <strong>User Manager</strong>.</p>
          <p style="font-size: 16px; font-weight: bold; line-height: 1.5; text-transform: uppercase;">Tu cuenta ha sido creada con éxito. Aquí están tus credenciales de acceso:</p>
          
          <div style="background-color: #FFCE00; border: 4px solid #000; padding: 20px; margin: 30px 0; box-shadow: 4px 4px 0px #000;">
            <p style="margin: 10px 0; font-size: 16px; font-weight: bold; text-transform: uppercase;"><strong>EMAIL:</strong> ${email}</p>
            <p style="margin: 10px 0; font-size: 16px; font-weight: bold; text-transform: uppercase;"><strong>CONTRASEÑA:</strong> <span style="text-transform: none; font-family: 'Courier New', Courier, monospace; background-color: #000; color: #fff; padding: 2px 6px; border-radius: 4px;">${passwordPlan}</span></p>
          </div>
          
          <p style="font-size: 14px; font-weight: bold; color: #333; text-transform: uppercase;">Te recomendamos cambiar tu contraseña una vez hayas ingresado por primera vez para mayor seguridad.</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="#" style="display: inline-block; background-color: #00C2CB; color: #000; padding: 15px 30px; text-decoration: none; border: 4px solid #000; box-shadow: 6px 6px 0px #000; font-weight: 900; font-size: 18px; text-transform: uppercase;">IR AL LOGIN</a>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; text-align: center; border-top: 4px solid #000;">
          <p style="font-size: 14px; font-weight: bold; color: #000; margin: 0; text-transform: uppercase;">© ${new Date().getFullYear()} USER MANAGER. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error enviando email:', error);
  }
};
