import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"StageConnect" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Failed to send email");
  }
};

export const generateWelcomeEmail = (user) => {
  const isStudent = user.role === "student";
  
  return {
    to: user.email,
    subject: "Bienvenue sur StageConnect !",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Bienvenue sur StageConnect</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Bienvenue sur StageConnect !</h1>
          </div>
          <div class="content">
            <p>Bonjour ${user.firstName || user.email},</p>
            <p>Nous sommes ravis de vous accueillir sur StageConnect, la plateforme qui connecte les étudiants et les entreprises pour des stages de qualité.</p>
            
            ${isStudent ? `
              <p>En tant qu'étudiant, vous pouvez :</p>
              <ul>
                <li>🔍 Rechercher des stages dans votre domaine</li>
                <li>📄 Créer votre profil professionnel</li>
                <li>📤 Postuler aux offres qui vous intéressent</li>
                <li>📊 Suivre l'état de vos candidatures</li>
              </ul>
            ` : `
              <p>En tant qu'entreprise, vous pouvez :</p>
              <ul>
                <li>📝 Publier des offres de stage</li>
                <li>👥 Gérer les candidatures reçues</li>
                <li>🔍 Trouver les meilleurs talents</li>
                <li>📈 Suivre vos statistiques de recrutement</li>
              </ul>
            `}
            
            <p>Commencez dès maintenant en complétant votre profil :</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" class="button">Accéder à mon tableau de bord</a>
            
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            
            <p>Cordialement,<br>L'équipe StageConnect</p>
          </div>
          <div class="footer">
            <p>© 2024 StageConnect. Tous droits réservés.</p>
            <p>Ce message a été envoyé à ${user.email}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

export const generateApplicationEmail = (student, internship, company) => {
  return {
    to: student.email,
    subject: `Candidature envoyée : ${internship.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Candidature envoyée</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .internship-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 15px 0; background: white; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Candidature envoyée avec succès !</h1>
          </div>
          <div class="content">
            <p>Bonjour ${student.firstName},</p>
            <p>Votre candidature a été envoyée avec succès pour l'offre suivante :</p>
            
            <div class="internship-card">
              <h3>${internship.title}</h3>
              <p><strong>Entreprise :</strong> ${company.companyName}</p>
              <p><strong>Lieu :</strong> ${internship.location.city}</p>
              <p><strong>Durée :</strong> ${internship.duration} mois</p>
              <p><strong>Type :</strong> ${internship.workType}</p>
            </div>
            
            <p>Vous pouvez suivre l'état de votre candidature depuis votre tableau de bord.</p>
            
            <p>Nous vous souhaitons bonne chance !</p>
            
            <p>Cordialement,<br>L'équipe StageConnect</p>
          </div>
          <div class="footer">
            <p>© 2024 StageConnect. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

export const generateInterviewEmail = (student, internship, interview) => {
  return {
    to: student.email,
    subject: `Entretien programmé : ${internship.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Entretien programmé</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .interview-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 15px 0; background: white; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Entretien programmé !</h1>
          </div>
          <div class="content">
            <p>Bonjour ${student.firstName},</p>
            <p>Félicitations ! Votre candidature a retenu l'attention et un entretien a été programmé.</p>
            
            <div class="interview-card">
              <h3>${internship.title}</h3>
              <p><strong>Date :</strong> ${new Date(interview.date).toLocaleDateString('fr-FR')} à ${new Date(interview.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</p>
              <p><strong>Type :</strong> ${interview.type}</p>
              ${interview.location ? `<p><strong>Lieu :</strong> ${interview.location}</p>` : ''}
              ${interview.notes ? `<p><strong>Notes :</strong> ${interview.notes}</p>` : ''}
            </div>
            
            <p>Préparez-vous bien pour cet entretien et n'hésitez pas à nous contacter si vous avez des questions.</p>
            
            <p>Bonne chance !</p>
            
            <p>Cordialement,<br>L'équipe StageConnect</p>
          </div>
          <div class="footer">
            <p>© 2024 StageConnect. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
