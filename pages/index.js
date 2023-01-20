import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    const [promptInput, setPromptInput] = useState("");
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: promptInput }),
            });

            const data = await response.json();
            setLoading(false);
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                );
            }

            setResult(data.result);
            setPromptInput("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <Head>
                <title>OpenAI Quickstart</title>
                <link rel="icon" href="/dog.png" />
            </Head>

            <main className={styles.main}>
                <h3>Enter a ChatGPT prompt</h3>
                <p className={styles.result}>{result}</p>
                <form onSubmit={onSubmit}>
                    <p>{loading ? "loading..." : ""}</p>
                    <textarea
                        style={{ padding: "1em", marginBottom: "30px" }}
                        autoComplete="false"
                        type="text"
                        name="prompt"
                        placeholder="Enter a prompt"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                    />
                    <input type="submit" value="Generate result" />
                </form>
            </main>
        </div>
    );
}
