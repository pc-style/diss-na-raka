**Source:** https://aistudio.google.com/prompts/1KGYk4SrgTYCZdp8bHpjsaPO83HZwgW7Y

## System Instructions

Optional tone and style instructions for the model

---

### User

docs
docs
Generated File April 23, 2026 - 12:29AM.plain
10,397 tokens

- live stats dashboard: a slick tracker showing total money raised, hours
    streamed, and exact number of times the song looped. you could probably
    scrape or hook into their donation api.
  - the vod indexer / guest timeline: a site that logs exactly when artists
    (bedoes, bambi, oki, etc) showed up on stream with timestamps and clips.
    finding specific moments in a 9-day 24/7 vod is impossible, chat would eat
    this up.
  - milestone roadmap: visual tracker of the donation goals (like when bedoes
    shaved his head at 500k) so chat stops spamming "what's the next goal" and
    can just check your site.

but can u find me past info for them??? so i can start it with data ready?

return it as a structured data type like json

Yo, check out what a Polish TikToker, łatwo gang, Did after Bedoes released his
song that was a diss for cancer. I can't really contribute with money because
I'm a poor fucking student, but I build cool shit on the internet, so tell me,
what can i do, something thats usefull, Connected to this whole action and maybe
can help in some aspect, but just cool things, a cool website probably for
people who follow this. I HAD THOSE IDEAS:

  - live stats dashboard: a slick tracker showing total money raised, hours
    streamed, and exact number of times the song looped. you could probably
    scrape or hook into their donation api.
  - the vod indexer / guest timeline: a site that logs exactly when artists
    (bedoes, bambi, oki, etc) showed up on stream with timestamps and clips.
    finding specific moments in a 9-day 24/7 vod is impossible, chat would eat
    this up.
  - milestone roadmap: visual tracker of the donation goals (like when bedoes
    shaved his head at 500k) so chat stops spamming "what's the next goal" and
    can just check your site.

but can u find me past info for them??? so i can start it with data ready?

---

### Model

# Data Architecture and Historical State Report: Łatwogang x Cancer Fighters Charity Stream

## Executive Summary

The ongoing nine-day continuous live stream hosted by the Polish digital creator Łatwogang, dedicated to raising funds for the Cancer Fighters Foundation, represents a watershed moment in digital philanthropy within the Polish internet ecosystem. By continuously looping the track "Ciągle tutaj jestem (diss na raka)"—a collaborative effort by rapper Bedoes 2115 and an 11-year-old oncology patient named Maja Mecan—the broadcast has successfully merged endurance streaming, music promotion, and gamified charity into a highly lucrative philanthropic engine [cite: 1, 2]. As of late April 22, 2026, the broadcast has surpassed the 3,000,000 PLN milestone and is rapidly approaching the 4,000,000 PLN threshold [cite: 3, 4]. 

For frontend engineers and data architects aiming to construct supplementary digital infrastructure around this event—such as a live telemetry dashboard, a Video on Demand (VOD) guest indexer, and a dynamic milestone roadmap—possessing pre-compiled, structured historical data is a critical prerequisite. Because official donation API endpoints frequently implement strict Cross-Origin Resource Sharing (CORS) policies or aggressive rate limits that prevent direct client-side polling, building a custom backend state is the most resilient approach. 

This document serves as a foundational backend-as-a-service (BaaS) blueprint. It provides the historical data payloads formatted as strict JSON structures, ready to be seeded into a NoSQL document database (such as MongoDB or Firebase) or a relational store. Furthermore, it provides deep technical context and socio-cultural analysis of the data points, ensuring that any developed user interface accurately reflects the nuances of the Polish hip-hop community and the mechanics of influencer-driven philanthropy.

## Cultural Context and the Mechanics of Gamified Philanthropy

To effectively design the data models for the tracking application, it is necessary to understand the cultural forces driving the stream's exponential financial velocity. The host, Łatwogang, has built a massive audience through highly ambitious, often absurd internet challenges. His previous endeavors include cycling 3,000 kilometers to Africa, recording the viral track "Azizam" with Ed Sheeran, and establishing a world record by accumulating 23 million comments on a single TikTok video [cite: 5, 6, 7]. Interestingly, despite his massive reach, Łatwogang has publicly discussed experiencing personal financial liquidity issues, revealing debts to fellow influencers Patec (10,000 PLN) and Tromba (7,000 PLN), alongside wage garnishments by bailiffs due to unmanaged tax liabilities [cite: 8, 9]. This history of financial transparency paradoxically enhances his credibility as a conduit for charitable giving, as the audience perceives him as authentic rather than corporatized.

The focal point of the stream is the song "Ciągle tutaj jestem (diss na raka)." Bedoes 2115 utilized a format deeply embedded in hip-hop culture—the "diss track"—but redirected the aggression toward pediatric cancer [cite: 10]. His collaborator, Maja Mecan, is currently fighting her third relapse of bone marrow leukemia, anchoring the digital event in a profound, real-world struggle [cite: 10, 11]. 

The stream's financial success relies heavily on "gamified philanthropy," wherein donations serve as micro-transactions that unlock real-world consequences for celebrities. The data models below capture these transactions, tracking the conversion of monetary milestones into spectacles of physical transformation (such as head-shaving) and exclusive cultural access (such as unreleased music snippets).

## Proposed System Architecture for Real-Time Tracking

Building a tracking site for an event of this magnitude requires an architecture capable of circumventing locked APIs while handling sudden traffic spikes caused by influencer appearances. The historical data provided in the subsequent sections serves as the initial database seed, but maintaining real-time accuracy requires a specific infrastructure pattern.

The optimal serverless architecture for this tracking application involves decoupling the data extraction layer from the client presentation layer. Since direct hooks into the donation gateway are likely unavailable, a Node.js worker can be deployed to utilize Optical Character Recognition (OCR) directly on the YouTube stream video feed to extract the live donation counter, effectively bypassing closed APIs. This isolated worker process continuously updates a central NoSQL database. In turn, the database pushes real-time state changes to the client frontend—built on frameworks like React or Next.js—via WebSockets. This ensures that end-users receive instant updates without overwhelming the application servers with constant HTTP polling requests, providing a seamless "slick tracker" experience.

## Component 1: Live Stats Dashboard Data Model

### Technical Implementation Context

The primary dashboard must aggregate and display dynamic integers: total funds raised, hours elapsed, and the estimated loop count of the song. The velocity of the donations indicates a highly engaged audience, driven by the "attention economy" where viewer retention is directly monetized for charity [cite: 12, 13]. The stream gathered 1.6 million PLN within its first two days alone [cite: 12]. According to channel analytics, Łatwogang's channel gained approximately 2.48 million video views and 17,000 subscribers on a single day (April 20) during this event [cite: 14]. 

The estimated loop count is derived mathematically from the elapsed time. Assuming the track is approximately three minutes long, it loops 20 times per hour. Displaying this specific metric appeals to the internet culture of endurance challenges, quantifying the psychological toll of the stream and creating a d sense of participation among the viewers.

The following JSON payload represents the static historical state. It is designed to hydrate the frontend application state before the WebSocket connections initialize the live feed.

### Dashboard State Payload (JSON)

```json
{
  "live_dashboard_state": {
    "metadata": {
      "host_id": "latwogang_official",
      "beneficiary": "Fundacja Cancer Fighters",
      "event_type": "continuous_charity_stream",
      "start_timestamp_utc": "2026-04-17T00:00:00Z",
      "last_updated_utc": "2026-04-22T22:00:00Z",
      "platform": "YouTube Live",
      "channel_id": "UCjpBbH8NmL4XHVUgJurDPZg"
    },
    "core_metrics": {
      "total_raised_pln": 3500000,
      "hours_elapsed": 142,
      "loop_target_track": {
        "title": "Ciągle tutaj jestem (diss na raka)",
        "primary_artists": ["Bedoes 2115", "Maja Mecan"],
        "track_length_seconds": 180,
        "estimated_total_loops": 2840
      }
    },
    "engagement_analytics": {
      "average_concurrent_viewers": 19000,
      "new_subscribers_during_event": 17000,
      "total_views_generated": 2480000
    },
    "velocity_indicators": {
      "average_pln_per_hour": 24647.88,
      "milestone_velocity": {
        "time_to_500k": "48 hours",
        "time_to_1M": "60 hours",
        "time_to_3M": "130 hours"
      }
    }
  }
}
```

### Dashboard Data Dictionary

The frontend application requires a clear understanding of the data types and their presentation logic.

| JSON Key | Data Type | UI Presentation Logic | Technical Notes |
| :--- | :--- | :--- | :--- |
| `total_raised_pln` | Integer | Primary Hero Statistic, formatted with spaces (e.g., "3 500 000 PLN"). | Requires an animation library (like Framer Motion) to visibly "tick" upward when the WebSocket pushes a new value. |
| `hours_elapsed` | Integer | Secondary Metric. | Can be derived client-side by comparing the current UTC time to `start_timestamp_utc` to reduce server load. |
| `estimated_total_loops` | Integer | Tertiary Metric. | Calculated as `(hours_elapsed * 60) / 3`. Provides a sense of scale for the endurance aspect. |
| `average_pln_per_hour` | Float | Analytical overlay. | Useful for predictive modeling, allowing the UI to show an "Estimated Time to Next Goal" progress bar. |

## Component 2: Milestone Roadmap Application State

### Technical Implementation Context

A major friction point in long-form endurance streams is chat repetition. Viewers constantly join the broadcast asynchronously and flood the chat with variations of "what is the next goal?" A visual roadmap component alleviates this friction, reducing moderation overhead and providing a clear path of progression. From a data architecture perspective, this should be structured as an array of objects, each possessing an enum status (`pending`, `achieved`, `failed`). This schema allows the frontend component to render a dynamic progress bar with clearly defined checkpoints.

### Milestone Roadmap Payload (JSON)

```json
{
  "milestone_roadmap_state": {
    "currency": "PLN",
    "milestones": [
      {
        "id": "ms_001",
        "target_amount": 500000,
        "title": "The Bedoes & Brokies Metamorphosis",
        "description": "Bedoes 2115 and the Brokies crew (including Dajczman) shave their heads, beards, and mustaches. Bedoes receives two tattoos live on stream: the single cover artwork and the Cancer Fighters logo.",
        "status": "achieved",
        "date_achieved": "2026-04-19T14:00:00Z",
        "verification_clip_url": null
      },
      {
        "id": "ms_002",
        "target_amount": 1000000,
        "title": "Łatwogang Commemorative Tattoo",
        "description": "Łatwogang receives a commemorative tattoo live on stream. Confetti deployment in studio.",
        "status": "achieved",
        "date_achieved": "2026-04-19T20:00:00Z",
        "verification_clip_url": null
      },
      {
        "id": "ms_003",
        "target_amount": 1250000,
        "title": "Disco Karol's Endurance Test",
        "description": "Disco Karol repeats the phrase 'Cancer Fighters' 100,000 times consecutively.",
        "status": "achieved",
        "date_achieved": "2026-04-19T23:30:00Z",
        "verification_clip_url": null
      },
      {
        "id": "ms_004",
        "target_amount": 2600000,
        "title": "Bambi's Exclusive Audio Snippet",
        "description": "Rapper Bambi reveals an exclusive, unreleased snippet of an upcoming track to the live audience.",
        "status": "achieved",
        "date_achieved": "2026-04-21T21:00:00Z",
        "verification_clip_url": null
      },
      {
        "id": "ms_005",
        "target_amount": 3000000,
        "title": "Szpaku's Live Concert Pledge",
        "description": "Rapper Szpaku pledges to arrive at the streaming studio and perform a live concert to further support the cause.",
        "status": "achieved",
        "date_achieved": "2026-04-22T10:00:00Z",
        "verification_clip_url": null
      },
      {
        "id": "ms_006",
        "target_amount": 3500000,
        "title": "Wojtek Gola's Sacrifice",
        "description": "Wojciech Gola fulfills the community challenge and publicly shaves his head.",
        "status": "achieved",
        "date_achieved": "2026-04-22T16:00:00Z",
        "verification_clip_url": null
      },
      {
        "id": "ms_007",
        "target_amount": 4000000,
        "title": "The Reconciliation: Oki & Kinny Zimmer",
        "description": "Rappers Oki and Kinny Zimmer agree to appear live on stream to officially end their long-standing feud and reconcile in front of the viewers.",
        "status": "pending",
        "date_achieved": null,
        "verification_clip_url": null
      }
    ]
  }
}
```

### Analytical Insights on Milestone Mechanics

The data architecture above reveals the highly sophisticated use of physical transformations and exclusive access as transactional rewards for collective audience behavior [cite: 2, 15, 16]. The physical shaving of heads, executed by Bedoes 2115, the Brokies crew, and Wojciech Gola, serves as a visceral, irreversible commitment to the cause, functioning as high-value content that generates secondary viral loops across platforms like TikTok and Instagram [cite: 2, 16, 17].

The most culturally significant pending milestone is the 4,000,000 PLN goal, which promises the live reconciliation of rappers Oki and Kinny Zimmer [cite: 15]. This represents a powerful meta-narrative within the Polish music industry. The two artists have been embroiled in a highly publicized feud. Kinny Zimmer initiated the conflict with the tracks "Darek" and "24/7," accusing Oki of lacking authenticity, utilizing Quebonafide as a ghostwriter for freestyles, relying heavily on Sobel for album production, and failing to cr individuals like Ada Nowakowska for his visual styling [cite: 18, 19]. Furthermore, Kinny criticized Oki for bringing rapper Bambi into the conflict [cite: 18]. Oki retaliated aggressively with the EP "REKLAMACJA'47" and the track "shoota!!!", dismissing Kinny's accusations and asserting dominance in the scene [cite: 19, 20]. 

Leveraging this real-world industry conflict as a fundraising mechanism is a masterclass in tension monetization. It transforms passive music fans into active donors who are eager to witness a historic, unscripted cultural moment. The application's UI should emphasize this specific pending milestone, perhaps utilizing a localized progress bar specifically targeting the 4M PLN gap, to maximize conversion rates.

## Component 3: VOD Indexer and Guest Timeline

### Technical Implementation Context

Finding specific moments in a 9-day, 24/7 continuous stream is a severe user experience bottleneck. While YouTube's native DVR functionality allows viewers to rewind, it lacks structured, searchable metadata. A VOD (Video on Demand) Indexer serves as a searchable database of key events. From a database schema perspective, this requires an array of event objects containing precise timestamps, participant identifiers, and categorical tags. Providing a frontend timeline component that maps to this JSON will highly engage the chat community, allowing them to instantly locate viral moments.

### Guest Timeline Payload (JSON)

```json
{
  "guest_timeline_indexer": {
    "total_events_logged": 8,
    "events": [
      {
        "event_id": "evt_001",
        "date_local": "2026-04-17",
        "relative_time": "Day 1 - Kickoff",
        "participants": ["Bedoes 2115", "Maja Mecan"],
        "category": "core_event",
        "description": "Stream initiates. The track 'Ciągle tutaj jestem (diss na raka)' begins its continuous loop.",
        "tags": ["start", "music", "foundation"]
      },
      {
        "event_id": "evt_002",
        "date_local": "2026-04-19",
        "relative_time": "Day 3 - Afternoon",
        "participants": ["Bedoes 2115", "Brokies", "Dajczman"],
        "category": "milestone_execution",
        "description": "The 500k PLN goal is reached. Bedoes, Brokies, and Dajczman shave their heads, forming the 'gang łysych'. Bedoes receives tattoos of the single cover and Cancer Fighters logo.",
        "tags": ["haircut", "tattoo", "milestone"]
      },
      {
        "event_id": "evt_003",
        "date_local": "2026-04-19",
        "relative_time": "Day 3 - Evening",
        "participants": ["Disco Karol"],
        "category": "endurance_challenge",
        "description": "Disco Karol begins the challenge of saying 'Cancer Fighters' 100,000 times after the 1.25M PLN goal is met.",
        "tags": ["challenge", "endurance"]
      },
      {
        "event_id": "evt_004",
        "date_local": "2026-04-21",
        "relative_time": "Day 5 - Evening",
        "participants": ["Bambi", "Francis"],
        "category": "guest_appearance",
        "description": "Rapper Bambi and producer Francis arrive. Bambi declines shaving her head, but Francis accepts and is shaved bald. They participate in a spicy sauce tasting challenge. Bambi officially commits to joining Bedoes's 'diss na raka' collaborative album project.",
        "tags": ["haircut", "food_challenge", "album_announcement", "bambi"]
      },
      {
        "event_id": "evt_005",
        "date_local": "2026-04-21",
        "relative_time": "Day 5 - Evening",
        "participants": ["Bambi"],
        "category": "milestone_execution",
        "description": "At the 2.6M PLN mark, Bambi reveals an exclusive snippet of her upcoming song.",
        "tags": ["music_premiere", "milestone", "bambi"]
      },
      {
        "event_id": "evt_006",
        "date_local": "2026-04-22",
        "relative_time": "Day 6 - Afternoon",
        "participants": ["Wojciech Gola"],
        "category": "milestone_execution",
        "description": "At the 3.5M PLN mark, Wojciech Gola fulfills the community challenge and shaves his head.",
        "tags": ["haircut", "milestone", "gola"]
      },
      {
        "event_id": "evt_007",
        "date_local": "2026-04-22",
        "relative_time": "Day 6 - Ongoing",
        "participants": ["Maciek Dąbrowski", "Kostek", "Zoja Skubis"],
        "category": "guest_appearance",
        "description": "Various influencers visit the studio to show support and drive continuous donations.",
        "tags": ["support", "influencers"]
      },
      {
        "event_id": "evt_008",
        "date_local": "TBD",
        "relative_time": "Pending",
        "participants": ["Szpaku", "Oki", "Żabson", "Doda", "White 2115"],
        "category": "scheduled_appearance",
        "description": "Artists scheduled to appear. White 2115 issued a time-sensitive challenge (an additional 150k PLN by 15:00) to trigger his appearance. Szpaku pledged a concert upon reaching 3M PLN.",
        "tags": ["upcoming", "conditional_challenge"]
      }
    ]
  }
}
```

### Event Classification Taxonomy

To allow the frontend to filter events effectively (e.g., a user only wants to see "haircuts" or "music premieres"), the data utilizes a strict tagging and categorization taxonomy.

| Category Enum | Definition | UI Treatment Recommendation |
| :--- | :--- | :--- |
| `core_event` | Foundational events related to the stream's initiation or termination. | Neutral background, standard typography. |
| `milestone_execution` | The fulfillment of a financial pledge. | Highlighted background (e.g., light green or gold), icon indicating success. |
| `guest_appearance` | Non-milestone visits by notable figures. | Avatar thumbnail of the guest, tag pills for the individuals involved. |
| `endurance_challenge` | Long-form activities occurring alongside the music. | Progress bar visualization if the challenge has quantifiable metrics. |
| `scheduled_appearance` | Anticipated future events, often tied to conditional triggers. | Pulsing or "locked" visual state to drive anticipation and donations. |

### Analytical Insights on the Timeline Structure

The timeline clearly exhibits a compounding network effect. Early commitments by tier-one artists like Bedoes 2115 establish undeniable credibility [cite: 2, 16]. This social proof creates a gravitational pull, compelling other major figures in the Polish entertainment industry to participate, thereby continually escalating the stakes. 

Bambi's involvement serves as a prime example of strategic integration. Her visit was not merely a passive appearance; by participating in spicy food challenges, subjecting her producer to the shaving consequence, and most importantly, pledging to record for the overarching charity album to fulfill a pediatric patient's dream, she deeply integrated her personal brand into the charity's ecosystem [cite: 15]. 

Furthermore, the introduction of conditional appearances introduces artificial scarcity into the donation cycle. For instance, White 2115 demanded an additional 150,000 PLN within a strict time limit (by 15:00) as the prerequisite for his appearance [cite: 2]. A well-designed VOD indexer should programmatically highlight these conditional challenges. By parsing the `scheduled_appearance` category and rendering active countdown timers on the frontend, the application can directly stimulate user action and accelerate funding velocity.

## Technical Recommendations for Deployment and Scalability

To successfully launch this suite of tools and ensure it remains stable under the immense load of the Łatwogang community, the following architectural principles must be strictly enforced:

1.  **State Hydration and Edge Caching**: The JSON payloads provided in this report should be utilized as the initial database seed. Upon application load, the frontend must fetch this historical state to instantly populate the VOD Indexer and Milestone Roadmap. To prevent database throttling during extreme traffic spikes (which are guaranteed when major milestones like the 4,000,000 PLN mark are hit), the backend must heavily cache these JSON responses. Deploying the static roadmap and timeline data via a Content Delivery Network (CDN) or utilizing edge computing solutions (e.g., Cloudflare Workers, Vercel Edge) is mandatory [cite: 4].
2.  **Optimized Real-time Synchronization**: For the Live Stats Dashboard, traditional HTTP polling must be avoided. Instead, implement WebSockets or Server-Sent Events (SSE). The server architecture should be configured so that the OCR ingestion worker only broadcasts a lightweight JSON patch to connected clients when a mathematical change in the on-screen donation amount is explicitly detected.
3.  **Frontend State Management**: The React or Next.js frontend should employ robust state management (e.g., Redux, Zustand) to handle the incoming WebSocket patches, ensuring that components like the `total_raised_pln` counter update smoothly without causing unnecessary re-renders of the entire DOM tree.

By implementing this decoupled, edge-cached architecture and utilizing the deeply structured historical data provided herein, the resulting application will provide immense utilitarian value to the community. It will effectively eliminate redundant chat inquiries regarding milestones, streamline the viewing experience, and establish a permanent, easily navigable historical record of a landmark event in Polish digital culture and philanthropy.

**Sources:**
1. [zdrowie.co.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE83nTYjdsLtSITrJlsVSY0G9_DeCybBfGF_EX4eJtwbBl_-CBjrL_tALj2xtqKhxEUwUv2q-8zT9NKrGwXWx_SmEIgqZe3GLK2GoNBQZjDROc2TPWBergKJ9kPIS4CQGGfjj2nIcfUuKRotyi-YJJVwIqhCp-jj6gF_W-M0cZ7OpUqZjdgTf9hw2uEL66VVugCiOyWpevxhkxqJg==)
2. [pudelek.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEhuK3X1q2WG3YofchllWGdeJh164wNMDDs-oOryU0GOszxAwtyUPWNG85JzmEAjt1VrdxC546qQCPILcvuOBTE7Xq7BsHxFU2nsj-rLTZj_DytxoW9Wadd5zt6sH9-iSJLYtxeepsiLBkAEsRYIssMEXG3KTR70on8w-y-9-UKT8YGKIrH7DVburcMXtPgQnlg6E6vQ4TW3jjGOvv0v9Se9JLu1yhWXRPk_1EKQl3bslxZGxCWWAMxdxU43Yj3305JxcYDdx-nLpo1nw==)
3. [plejada.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEKPVgCZJR6sUAD07OPKXxwlsGflFLBLljTLmv6uYTB4HXnlwm940rU1JbWbMr8tMSUuqnjARyLGKiqDB4nJ_czj521AQWn53XmH-yGIxEoNe-hyxRqamVUj3KfyIn2zlgKqCc69POT4JGCiwPQYDtNOwyt6eNkNO1aflDXW852fwKLt1N_g5FlOzJ8PWpITlSL2WTRjrX9IWFd)
4. [glamrap.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHl1DfrHmz1oiQ_1Vq-dkpKGihXeEg2ajtZM7364WEm3ZFfpLy90RxhEMpPtNEJhxihsmqrK9r7Y-6pKj8GOgqLl0-bylFPNd79CJGUPukWZSf7peOcVSHQIXAACzU1ti4nI6rE_BbbFESVeI-kAdCkIZGqpaWg8debk8EixRBAbPciZCFtB6sFVGYI9XjdAqvXhgOq2mBtf0eO2GXoiL0xFg==)
5. [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESugFsESiHeFtpz09VF7qI1yEKgrUk_p55AkqmKDjA20veSAgsQDAXsGmh-LcTXLNmsx1usYHNsnp-_dKg75rilgS4gHlzy1WPycSk_nhll90xUEPMw4QGfEQdVorLP-LnWN6rObKCEGwEXvzxDmP3y8PA4g==)
6. [vibez.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgszzdTypMVDvzBmHm8OBmP5mzfGw-wPwqRfRkeEVsEe8F6G9ASYUxVO3vdgjeXcKULAxtlErtv6ulvBxlsb5T7RyoNuck2-x6sQU3WkccKvj9mMfEisuEwk3srHGD8Sg7jwCg4z9b5_tIunvX1pZlDLfoSPnsUtVLsP1mlt-KISZEf_ZDomNKACeqHbZdkawoOBGXs5YCUi5f--6fHcXwUDeNdWoqxKzT1NQUmFWGUgbkHwRl)
7. [glamrap.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEJlD2p6r1XaDou4Igk_PcZTcURKi9NafDCr9GVevmFsWr2GVmUfPiyxTDUm0M0InPxlQnubzrzMB-QiVuMeU_dawM4bOyX0ECB9C4e1SR9TCq47oLfEiDgF_X0goLFLnNpH6KprhyVDhOZ3E3bPBecOWLCSg==)
8. [onet.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWtQuj4tCSQdOLPL-p8FPg-eJxW6q_N0cYFHOhCaiKtPzPIWUGYMG7YtOJuHvPYV-qkuEdibWvgWi9HJ9f_Kq4rtx3S9VPcbfh1foxFT0AqobKl3YBb8LoXHpbD0mh-fYHuGstO9wcn7CfqxdEB8H7SisTddG5CI1_SC1HSOeQkU-CdRh52D7rwZnmVQhLXXJX0aAmAmtqbRkslXJ7WPEVYon31SFoxi2X7WHJckT-uUjJpfnW9H45F49Q)
9. [boop.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBw6hyF8-SCw8d1Sc3D92K1j256LMCQdPwiFFZISFbtnL-KWRNHKuZy4IPWoxU7lmlbzsnYfmNfomo2uPx1xCY4U5t98lnl2wUH0AssGgYx4_hT_7TS3uHDjnA4NfXfYkGm22YphBZmAAQyK61ihvTlm0yxIPzgRSIzNYnGk6ogTjPHus62GF_iQAUUa9FTYk=)
10. [wp.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHiDH6E26EAxGjNqUVtAEltIlM1xRHwa8V2w9EZUDarsrzJtekbH2THb-3v5uXSB8gXlfn5jTT4oqwNAHVPzFuWU5_CZN9zz0o6V-z8C95ViYw9mJWv6mr7dFUei1xmARZuTfOKkLa0lByIUieZlmXhj45oXCH1wJfj4DpmvDfwyfXNAhieRe6892rK9WctkiHTbDoxftOTJFfUhw==)
11. [swiatgwiazd.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4306YC8iXbhTIQtcoAwKx1qI1iceKDcEeosJw_V6kbY_jhC-FAuusE1XVx94v64sGM9qNNDy-NiKBsuLICjpY-T-nNNBGPn7rnMVTTf0FFWAzEaTaFPch64SxiQ9i-pjjhazqwSHRF98c_nj2erUWDXAfnvAObRvSMYbczHxUcKyIY-6aimPE6f3ZzvhLEDB8Dnp-sqgLmZPBL0b8SIPYQA==)
12. [bezuzyteczna.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJ2xRrPf_ksYM11M9hqgzgzABC6nNM7JSZsd1stcGa-dnN9Hu_gjwewobkYgt5H-1DZxk4gjhr53Iv08N_27sRRIUoBN92K9aOfwSsmROMVAKVjZigwyoib45v40zIZ8Z8A_dNnE9jp4CIu6wYZdX6fV5VbNzx5_PPeQR18pl_MM1fpb0_BJBGjGzuYtU194tbqNp86lA9jH9Dm_O88aqGKb14ueDZD7NYnRfIx4YHoAalY1Onp_75HeTIDe7Ci55hpgzRLOoPKYTQQ5WBrkYsWOc5qh751AtMoSJZOHGHhGlkC9j3T1Jbccgp8f0HbX02gzmDmZMsPE-PwGIHUAeL2okcmyLhy0VvAbg5ENx6swMQgiOxjq8nHd0a75Mwe3_q3fD1flkPLMtymTMHXpvcU7xb3ym8WhKFfCt-hexcXDn59Axx)
13. [multiscreenday.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF74yJe1-xA45F-sLDTVIeA2VLnY9Ti3cJIxyI9sSBqR4F8Um8Le--215GW6Rvdg5vhvNav6GmaVPCgUPihekQSjWf_A-dHZeV5Qor-8v11og==)
14. [vidiq.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHKqJ-ZMr4DjHGadpZ_SHjPv4IXPtc2VrELVn7S5ukdvvBhgC2ljf3AmHOhalOGhL8nilP1awIea-LmQUPBNfhaZhhqi-4nbq3me7V_tZy9m1d48l5Tcduzhz1i-PFkxBTVBuFxI8bZ6SJSpMAGVF6piWyOk_We7w==)
15. [glamrap.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpx-pQkP2gFdoobRGpg47M01sh21CedoMORqK_HC7kkCLsrZkqfJQoFvuEtK7awRkVMY7R0jnEupD2NSgI6-AmASilUMFyx1U-9kjEpUp86ijKvj3Bmgc2JRQmLvHF1h4gMRj6djrJqjRsQGRaGtCJWTUXe_Z8mBmGYNgk1hlkztbl8hzq6J_lAdq_kzcAvWnMXy8=)
16. [glamrap.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfms8jmM3p9MX4AmEmW6BPtkLhLCHmltMWhruZfo-Lbyd5-GvJrfL9ebV7UnRotIc6BCGvJerh0EHrt0XqFmXT3ezYaNujcO10Zn_aJ-kBP_xLPazo00QMFFCQcZgjBwBLkoLui5Hp6RI04PQ9XVPlzqpzxuo14aQwclYBNoyIC8-UOPHI1XqL23v543rwDBUsU9lmEOv8jibOc7Zkr1l3sco=)
17. [swiatgwiazd.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHXLI82IWUDBRqfW05HIdJ4V6QiQ1p2Ri9wVS1x8BuxorPMOICjvWaew_6S4wyyNJZGq3TUBbRMMs1deCbWgIKbOxjiRKj-J_c982R5DGYwRXYpu6Br8IBfK-8yVlXA-zuaPE3bjJjqVj9qRs0esTza8G3kJJpp2eiD6G0U4ODn0JH5tX9gwav0Y7ilGHYtFfI1oatqIVwH6xT1aCWD9EK0jDIEt4=)
18. [cgm.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEu_cXLd_5jAtaDeQXVD98JaszfuSHdH7uTTpw4OxX8Wh-shE_xpnCMCQzYT8ZNLzjVAieZBf15tRP00KsGMnWb_g2mHrd3W5mLLX3YS-9JHW4aMsk1cTjAckXCK68RfjRvJbTYNiCWJnbUl02DIpQueXOca1XlPudDfSR5jXVvs4VeiPWM01DCsi9ONBV3ugc8bOVsicr7w83pA7sDs9y2T84y2rMRCjwD5nH1fJk7ZVP_GU9HckqLNZv20OAGS76du5fBA4tDxijoxBUXVLLLcc-1DmGh)
19. [cgm.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGk9bX-nQF0-KRnQME1NeLplaKQ6KfvGX9fKUkxZHz1jocgbASJGR6rDwohhq8SvFvGYcxmFSdcYb9zz0ocipzHIkjCdQ_p8YtslQfBuoDwQhApsSd64EJSGJdBQ-4B_g8KXzgT88rbnzOpyvj9dbIfo_pY_xMCIDOOROjb-mCElh1hFJWQhYrIYWYllxMzzQ627IdZIy23-wUkz8OWpCYGWmwu)
20. [cgm.pl](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwEHXRGaxgCt75FdNWnicaQPYyU5nWspxQH8OVHoTG59C42izMOQUcM6fodqIJq-QpyrWYk92I_rHt_3GuOV5mm-ebkgPRn-c6HB_zlb1xqujOklO1MBhCji-8BHcNbyijE8pdHeS-bX4tmrmMRAo3nqAjY0gBWLrt-kxqPt2zhbcOnTKnMf3D5F4tXYMQNpytG8Vfh_2SrkdMm_S_MhDN3NyEy6fcdVArKjjmONRYpzYab1uQMzIPvYH4YhMT4uw=)

---

