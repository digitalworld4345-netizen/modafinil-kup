const { createTransport } = require('nodemailer');

exports.handler = async (event) => {
  const { customer, cart } = JSON.parse(event.body);
  const shippingFee = 44;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'admin@modafinil-kup.pl',
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Email to Admin
    await transporter.sendMail({
      from: 'Modafinil-kup.pl <admin@modafinil-kup.pl>',
      to: 'admin@modafinil-kup.pl',
      subject: `Nowe zamówienie #ORD-${Date.now() % 10000}`,
      html: `
        <h2>Nowe zamówienie!</h2>
        <p><strong>Klient:</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Telefon:</strong> ${customer.phone}</p>
        <p><strong>Adres:</strong> ${customer.street}, ${customer.postalCode} ${customer.city}</p>
        <p><strong>Łączna kwota:</strong> ${total} zł</p>
        <h3>Produkty:</h3>
        <ul>
          ${cart.map(item => `<li>${item.name} x${item.quantity} (${item.pack} szt.) – ${item.price * item.quantity} zł</li>`).join('')}
        </ul>
      `,
    });

    // Email to Customer
    await transporter.sendMail({
      from: 'Modafinil-kup.pl <admin@modafinil-kup.pl>',
      to: customer.email,
      subject: 'Potwierdzenie zamówienia',
      html: `
        <h2>Dziękujemy, ${customer.firstName}!</h2>
        <p>Twoje zamówienie zostało przyjęte.</p>
        <p><strong>Łączna kwota:</strong> ${total} zł (płatność przy odbiorze)</p>
        <p>Wkrótce się z Tobą skontaktujemy.</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, orderId: `ORD-${Date.now() % 10000}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};