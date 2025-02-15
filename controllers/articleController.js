const Article = require('../models/articleModel');
const File = require('../models/fileModel');

exports.createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.json(article);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getFile = async (req, res) => {
    try {
        const { id } = req.params
        const file = await File.findById(id);
        if (!file) return res.status(404).json({ message: "Fayl topilmadi" });
        res.set("Content-Type", file.contentType);
        res.send(file.data);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.createFile = async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        if (originalname && mimetype && buffer) {
            const image = new File({
                name: originalname,
                data: buffer,
                contentType: mimetype,
            });
            await image.save();
            res.status(200).json(`${process.env.HOST_URL}/file/${image._id}`)
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}