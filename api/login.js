module.exports = async (req, res) => {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const { password } = body || {};

  if (!password || typeof password !== 'string' || !password.trim()) {
    return res.status(400).json({ sucesso: false, erro: 'Por favor, digite a senha.' });
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password.trim() === expectedPassword.trim()) {
    return res.status(200).json({ sucesso: true, mensagem: 'Autenticado com sucesso!' });
  } else {
    return res.status(401).json({ sucesso: false, erro: 'Senha incorreta. Tente novamente.' });
  }
};
