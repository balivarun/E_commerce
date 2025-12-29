import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter - Using Gmail as an example
    // You can use other email services like SendGrid, AWS SES, etc.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your gmail address
        pass: process.env.EMAIL_PASS, // Your gmail app password
      },
    })

    // Email content for you (the recipient)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'varunbali47@gmail.com',
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Contact Form Message</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h4 style="color: #333; margin-top: 0;">Message:</h4>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #28a745; font-size: 14px;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
          
          <p style="font-size: 12px; color: #6c757d; text-align: center;">
            This message was sent from the ShopSphere contact form.
          </p>
        </div>
      `,
    }

    // Auto-reply email to the sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting ShopSphere',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Thank you for contacting us!</h2>
          
          <p>Dear ${firstName},</p>
          
          <p>We have received your message and appreciate you taking the time to contact us.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="margin-top: 15px;"><strong>Message:</strong></p>
            <p style="background-color: #ffffff; padding: 15px; border-radius: 4px; border-left: 4px solid #3B82F6;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <p>Our team will review your message and get back to you within 24-48 hours.</p>
          
          <p>If you have any urgent concerns, please don't hesitate to call us at <strong>+91 9996094192</strong>.</p>
          
          <p>Best regards,<br>
          <strong>The ShopSphere Team</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
          
          <p style="font-size: 12px; color: #6c757d;">
            This is an automated response. Please do not reply to this email.<br>
            For direct contact, email us at: varunbali47@gmail.com
          </p>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(autoReplyOptions)

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}