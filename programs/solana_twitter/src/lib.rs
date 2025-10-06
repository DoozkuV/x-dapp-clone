use anchor_lang::prelude::*;

declare_id!("HQJ99aFb3TrTe2dsF6wevCRaiT5qwTHRD635EeoZnyWR");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
