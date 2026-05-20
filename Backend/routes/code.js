import express from "express"
import axios from "axios"
const router = express.Router()
router.post('/', async (req, res) => {
    try {
        const { source_code, language_id, stdin } = req.body

        if (!source_code || !language_id) {
            return res.status(400).json({
                error: "source_code and language_id are required"
            })
        }

        const result = await axios.post(
            process.env.JUDGE0_URL,
            { source_code, language_id, stdin: stdin || "" },
            { headers: { "Content-Type": "application/json" } }
        )

        res.json(result.data)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
export default router