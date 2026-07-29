import express from "express"
import axios from "axios"
const router = express.Router()

const noisePatterns = [
  /OpenJDK.*Server VM warning.*Xverify:none/i,
  /OpenJDK.*Server VM warning.*noverify/i,
  /Options .*-Xverify:none.*deprecated/i,
  /Options .*-noverify.*deprecated/i,
]

function cleanOutput(output) {
  if (!output) return output
  return output
    .split('\n')
    .filter(line => !noisePatterns.some(pattern => pattern.test(line)))
    .join('\n')
    .trim()
}

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


        const cleanedData = {
      ...result.data,
      stdout: cleanOutput(result.data.stdout),
      stderr: cleanOutput(result.data.stderr),
      compile_output:
    result.data.status?.id === 3
      ? null
      : cleanOutput(result.data.compile_output),
    }

        res.json(cleanedData)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
export default router