# Provider research — Red Velvet hybrid stack

## Decision

Chosen architecture: **LiveKit for first-party live video, Stream Chat for persistent human chat, existing Rubina AI kept separate, and external adult platforms used only as clearly disclosed outbound affiliate links**. No scraping, stream mirroring, chat mirroring, or iframe embedding without written permission.

## Provider findings

### Agora — exclude
Agora's official Acceptable Use Policy explicitly prohibits adult content or entertainment, including pornography, erotic content and sexually explicit content. Sources: https://www.agora.io/en/acceptable-use-policy/ and https://docs.agora.io/en/realtime-media/rtc/reference/pricing.

### Daily — conditional, not selected
Daily offers Prebuilt iframe/custom Web SDK, room tokens and webhooks, but its public terms do not expressly approve sexually explicit content and allow blocking/removal of content considered obscene or objectionable. Sources: https://www.daily.co/terms-of-service/ and https://docs.daily.co/reference/daily-js/factory-methods/create-frame.

### Twilio — conditional, not selected
Twilio offers Programmable Video and Conversations with server-issued access tokens and webhooks. Its public Acceptable Use Policy and messaging guidance make adult/sexually explicit use high risk; no public approval for this exact use case was verified. Sources: https://www.twilio.com/legal/aup, https://www.twilio.com/docs/video/javascript, https://www.twilio.com/docs/conversations-classic/sdk-overview.

### LiveKit — selected for video, subject to written approval
LiveKit provides WebRTC rooms, audio/video/data tracks, React components, text streams, webhooks, JWT access tokens and self-hosting options. Its public terms prohibit illegal, non-consensual and harmful content but do not clearly pre-approve explicit adult content. Written provider confirmation is required before production use for explicit content. Sources: https://docs.livekit.io/intro/basics/, https://docs.livekit.io/reference/components/react/, https://docs.livekit.io/home/server/generating-tokens/, https://livekit.io/legal/acceptable-use-policy, https://livekit.io/pricing.

### Stream — selected for human chat, subject to written approval
Stream provides Chat API, web SDK/React UI, DM/groups/live chat, moderation tools, Video/Audio/Livestream and webhooks. Its public terms do not clearly pre-approve explicit adult content; lack of an explicit ban is not permission. Written confirmation is required before production use. Sources: https://getstream.io/chat/docs/, https://getstream.io/video/docs/, https://getstream.io/chat/docs/javascript/moderation/, https://getstream.io/docs/platform/webhooks, https://getstream.io/legal/.

## External adult platform findings

### Chaturbate
The official affiliate page exposes affiliate program tools and links to an Events API documentation page. Chaturbate itself has its own age gate and terms. Use only official affiliate/event mechanisms; no content mirroring is assumed. Sources: https://chaturbate.com/affiliates/ and https://chaturbate.com/apps/api/docs/.

### Stripchat
The official site identifies itself as an 18+ live adult entertainment destination and links its Webcam Affiliate Program. No public official embed/API permission for mirroring its stream or chat was verified. Use outbound affiliate links only unless written permission is obtained. Source: https://stripchat.com/affiliates.

### CAM4
The official affiliate surface was found, but no official public embed/API permission for mirroring live video or chat was verified. Use outbound affiliate links only unless written permission is obtained. Source: https://www.cam4.com/affiliate.

## Safety requirements before production

The platform owner remains responsible for age assurance, performer age/identity and consent records, non-consensual intimate imagery response, CSAM prevention and reporting, human moderation, takedown and appeal workflows, data minimization, retention/deletion, jurisdictional restrictions, payment and processor policy, and provider approval. The LiveKit and Stream adapters in this release fail closed when secrets are missing and never expose provider secrets to the browser.
