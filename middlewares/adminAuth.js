exports.adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (username === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
        return next();
    }

    return res.status(401).json({ message: "Invalid credentials" });
};
