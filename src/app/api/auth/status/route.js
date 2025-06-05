// pages/api/auth/status.js
export default async function handler(req, res) {
  try {
    // Example: Fetch session or token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    // Replace with your own auth logic (e.g., JWT verify, DB check)
    const user = await getUserFromToken(token);

    if (!user) return res.status(401).json({ error: 'User not found' });

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
      isPaid: user.isPaid, // ← this field controls access
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
