import { generateMnemonic } from "bip39";

export async function GET() {
  try {
    const mnemonic = generateMnemonic();
    if (!mnemonic) {
      return new Response(JSON.stringify({ message: "Error" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ seedPhrase: mnemonic }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ message: "Error generating mnemonic" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
