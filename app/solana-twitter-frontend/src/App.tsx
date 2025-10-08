import { useEffect, useState } from 'react'
import { AnchorProvider, Program, web3, type Idl } from '@coral-xyz/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import idl from "../../../target/idl/solana_twitter.json";
import { type SolanaTwitter } from '../../../target/types/solana_twitter';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function App() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [program, setProgram] = useState<Program<SolanaTwitter> | null>(null);
  const [tweets, setTweets] = useState<any[]>([]);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!wallet.publicKey) return;
    const provider = new AnchorProvider(connection, wallet as any, {});
    const p = new Program<SolanaTwitter>(idl as Idl, provider);
    setProgram(p);
  }, [wallet, connection]);

  const sendTweet = async () => {
    if (!program || !wallet.publicKey) return;
    const tweetKey = web3.Keypair.generate();
    await program.methods
      .sendTweet(topic, content)
      .accounts({
        tweet: tweetKey.publicKey,
        author: wallet.publicKey,
      })
      .signers([tweetKey])
      .rpc();

    setTopic("");
    setContent("");
    fetchTweets();
  }

  const fetchTweets = async () => {
    if (!program) return;
    const tweets = await program.account.tweet.all();
    setTweets(tweets.map((t) => t.account));
  };

  useEffect(() => {
    if (program) fetchTweets();
  }, [program]);

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Solana Twitter (Localnet)</h1>
      <WalletMultiButton className='mb-4' />
      {wallet.connected ? (
        <>
          <div className='space-y-2 mb-4'>
            <input placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className='border p-2 w-full'
            />
            <textarea placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='border p-2 w-full'
            />
            <button
              onClick={sendTweet}
              className='bg-blue-500 text-white px-4 py-2'
            >
              Send Tweet
            </button>
          </div>
          <div>
            {tweets.map((t, i) => (
              <div key={i} className='border p-2 mb-2'>
                <p className='text-sm text-gray-500'>{t.topic}</p>
                <p>{t.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  )
}

export default App
