use anchor_lang::prelude::*;

declare_id!("HQJ99aFb3TrTe2dsF6wevCRaiT5qwTHRD635EeoZnyWR");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String) -> Result<()> {
        let tweet = &mut ctx.accounts.tweet;
        let author = &ctx.accounts.author;

        require!(topic.len() <= 50, ErrorCode::TopicTooLong);
        require!(content.len() <= 280, ErrorCode::ContentTooLong);

        tweet.author = *author.key;
        tweet.timestamp = Clock::get()?.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = 8 + Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

impl Tweet {
    pub const LEN: usize = 32 + 8 + (4 + 50) + (4 + 280);
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
