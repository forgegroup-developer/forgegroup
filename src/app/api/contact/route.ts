import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In un ambiente di produzione reale, qui implementeremmo Nodemailer, Resend o SendGrid
    // per inviare l'email a info@forgegroup.it
    // Es: await resend.emails.send({ from: '...', to: 'info@forgegroup.it', subject: 'Nuovo Lead', react: <EmailTemplate {...data} /> })

    console.log("=== NUOVA CANDIDATURA RICEVUTA ===");
    console.log(data);
    console.log("===================================");

    // Mock response for now
    return NextResponse.json({ success: true, message: "Candidatura inviata con successo." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Errore durante l'elaborazione della richiesta." },
      { status: 500 }
    );
  }
}
