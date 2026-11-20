# GSC actions 2026-11-20

Follow-up to `docs/audit/audit-2026-11-20.md`. Done from Chrome (Search Console UI) and the agent gateway (MCP `mail`).

## GSC access for the gateway: OK

- The verified property is `https://1baraban.com/` (URL prefix), siteOwner borntojesus@gmail.com. `sc-domain:1baraban.com` exists only as unverified on alpinaproductionkiev@gmail.com, which is why the audit saw "access denied".
- Proof: `gsc_query` channel `analytics:borntojesus@gmail.com`, site `https://1baraban.com/`, dimensions `date`, 28 days to 2026-11-17: rows returned (no impressions on 2026-11-10..12).
