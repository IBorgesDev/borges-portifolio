import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, message, to } = await request.json();

    const content = `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `;

    const msg = {
      to: to,
      from: 'icaroddborges@gmail.com',
      subject: 'NOVO CONTATO - PORTFOLIO',
      text: content,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error && 'response' in error) {
      console.error('SendGrid API Response:', JSON.stringify(error.response, null, 2));
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
