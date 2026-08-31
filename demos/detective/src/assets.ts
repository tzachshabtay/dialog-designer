import { defineAiAssets } from "@ai-game-assets/core";

export const assets = defineAiAssets(
{
  "background.library": {
    "id": "background.library",
    "kind": "image",
    "prompt": "Wide 1930s private library at night, straight-on theatrical game backdrop, floor-to-ceiling bookshelves, rain-streaked center window, brass wall lamps, empty glass display case on a pedestal, three clear standing areas, deep navy and walnut palette, no people, no text.",
    "dimensions": {
      "width": 960,
      "height": 640
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "opaque",
      "format": "png"
    },
    "activeVersion": "default",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/background.library.default.svg",
        "prompt": "Deterministic vector illustration of a storm-lit 1930s private library with shelves, window, lamps and an emptied display case.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      }
    },
    "tags": [
      "background",
      "library",
      "mystery"
    ]
  },
  "character.ada": {
    "id": "character.ada",
    "kind": "image",
    "prompt": "Full-body portrait sprite of Ada Mercer, sharp intelligent woman pianist in her late twenties, dark red 1930s evening dress, controlled posture masking anxiety, tasteful jewelry, painterly graphic-novel style, transparent background.",
    "dimensions": {
      "width": 180,
      "height": 320
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "format": "png",
      "referenceAssetIds": [
        "background.library"
      ]
    },
    "activeVersion": "default",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/character.ada.default.svg",
        "prompt": "Deterministic vector character portrait of Ada Mercer in a dark red 1930s evening dress.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      }
    },
    "tags": [
      "character",
      "suspect",
      "ada"
    ]
  },
  "character.bram": {
    "id": "character.bram",
    "kind": "image",
    "prompt": "Full-body portrait sprite of Bram Holt, broad weathered estate electrician in his late forties, rolled shirtsleeves, charcoal waistcoat, leather tool satchel, wary but honest eyes, painterly graphic-novel style, transparent background.",
    "dimensions": {
      "width": 180,
      "height": 320
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "format": "png",
      "referenceAssetIds": [
        "background.library"
      ]
    },
    "activeVersion": "default",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/character.bram.default.svg",
        "prompt": "Deterministic vector character portrait of Bram Holt with work clothes and tool satchel.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      }
    },
    "tags": [
      "character",
      "suspect",
      "bram"
    ]
  },
  "character.lucien": {
    "id": "character.lucien",
    "kind": "image",
    "prompt": "Full-body portrait sprite of Dr. Lucien Vale, elegant silver-haired historian in his late fifties, midnight blue three-piece suit, gloves and a slim clasped exhibition folio, polished charm with guarded eyes, painterly graphic-novel style, transparent background.",
    "dimensions": {
      "width": 180,
      "height": 320
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "format": "png",
      "referenceAssetIds": [
        "background.library"
      ]
    },
    "activeVersion": "default",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/character.lucien.default.svg",
        "prompt": "Deterministic vector character portrait of Dr. Lucien Vale with a midnight suit and clasped folio.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      }
    },
    "tags": [
      "character",
      "suspect",
      "lucien"
    ]
  },
  "line.ada.apology": {
    "id": "line.ada.apology",
    "kind": "voice-line",
    "prompt": "Accept an apology without surrendering all pride.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Do not mistake my forgiveness for forgetfulness. Ask your questions.",
      "direction": "Cool, then a slight thaw on the second sentence."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "trust"
    ]
  },
  "line.ada.bram": {
    "id": "line.ada.bram",
    "kind": "voice-line",
    "prompt": "Offer an observation that supports Bram's work order.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Father handed Holt a signed work slip before dinner. They argued afterward, but the paper was real.",
      "direction": "Matter-of-fact, correcting an unfair suspicion."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "clue"
    ]
  },
  "line.ada.clock": {
    "id": "line.ada.clock",
    "kind": "voice-line",
    "prompt": "Reveal the impossible clock detail precisely.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Impossible. I took out the pendulum at twenty to nine. Its ticking ruins my timing.",
      "direction": "Immediate certainty, then a musician's irritation."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "clue"
    ]
  },
  "line.ada.dark": {
    "id": "line.ada.dark",
    "kind": "voice-line",
    "prompt": "Describe the sounds heard in darkness.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "A lamp switch. Glass lifting. Then Vale's folio clasp snapped shut.",
      "direction": "Eyes closed in recollection, separated beats, growing certainty."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "clue"
    ]
  },
  "line.ada.debt": {
    "id": "line.ada.debt",
    "kind": "voice-line",
    "prompt": "Confess a private financial secret without confessing the theft.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "I planned to pawn Mother's brooch for conservatory tuition. I wanted one thing in this house that was mine.",
      "direction": "Proud at first, softening involuntarily on the last phrase."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "red-herring"
    ]
  },
  "line.ada.defensive": {
    "id": "line.ada.defensive",
    "kind": "voice-line",
    "prompt": "Close down after an unfair accusation.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Then you have found your answer. Stop asking me for help.",
      "direction": "Cold, wounded, and final."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "hostile"
    ]
  },
  "line.ada.intro": {
    "id": "line.ada.intro",
    "kind": "voice-line",
    "prompt": "Acknowledge the obvious suspicion with brittle composure.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "And I have debts. I know how neatly that sounds.",
      "direction": "Dry and controlled, hurt hidden beneath the wit."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada"
    ]
  },
  "line.ada.reveal": {
    "id": "line.ada.reveal",
    "kind": "voice-line",
    "prompt": "Demand the folio be opened at the climax.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Open it.",
      "direction": "Quiet, absolute command."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal"
    ]
  },
  "line.ada.threat": {
    "id": "line.ada.threat",
    "kind": "voice-line",
    "prompt": "Recall the victim's threat and Vale's reaction.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Father told Vale, ‘At ten, the watermark ends the lie.’ Vale looked as though he had been struck.",
      "direction": "Hushed and exact, ashamed she listened but sure of the words."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "clue"
    ]
  },
  "line.ada.trust": {
    "id": "line.ada.trust",
    "kind": "voice-line",
    "prompt": "Accept the detective's discretion and offer cooperation.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "All right. You keep my confidence; I will give you the room exactly as I remember it.",
      "direction": "A careful truce, still guarded but sincere."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "trust"
    ]
  },
  "line.ada.wax": {
    "id": "line.ada.wax",
    "kind": "voice-line",
    "prompt": "Connect the blue sealing wax to Lucien.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Mine is blue. Dr. Vale borrowed a stick Tuesday; he said a catalogue seal had split.",
      "direction": "Recollection turning into alarm as the implication arrives."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "clue"
    ]
  },
  "line.ada.wrong": {
    "id": "line.ada.wrong",
    "kind": "voice-line",
    "prompt": "Reject a premature accusation and challenge the detective.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Search me. When you find nothing, decide whether you wanted a culprit or merely a convenient woman.",
      "direction": "Cutting, controlled anger."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "ada",
      "accusation"
    ]
  },
  "line.bram.alarm": {
    "id": "line.bram.alarm",
    "kind": "voice-line",
    "prompt": "Admit disabling the alarm while insisting there was an order.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Mercer ordered it disconnected. The contacts were failing, and he wanted silence until I replaced them.",
      "direction": "Reluctant admission, factual and unsentimental."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "red-herring"
    ]
  },
  "line.bram.breaker": {
    "id": "line.bram.breaker",
    "kind": "voice-line",
    "prompt": "Explain that the blackout was local and the main breaker untouched.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Nothing tripped at the main board. Only this room died. The fault began in here.",
      "direction": "Technical confidence, clipped phrases."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "clue"
    ]
  },
  "line.bram.hostile": {
    "id": "line.bram.hostile",
    "kind": "voice-line",
    "prompt": "Withdraw technical help after a careless accusation.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "If you have already measured the rope, inspect the wiring yourself.",
      "direction": "Hard, offended, dangerously quiet."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "hostile"
    ]
  },
  "line.bram.intro": {
    "id": "line.bram.intro",
    "kind": "voice-line",
    "prompt": "Reject the idea that suspicious facts equal guilt.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "An ugly fact is not the same thing as a guilty one.",
      "direction": "Gruff restraint, accustomed to being blamed."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram"
    ]
  },
  "line.bram.lamp": {
    "id": "line.bram.lamp",
    "kind": "voice-line",
    "prompt": "Trace the deliberate short to Vale's reading lamp.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Vale's reading lamp. A copper page marker was bent across the live contacts. Deliberate.",
      "direction": "Low certainty, letting the final word land."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "clue"
    ]
  },
  "line.bram.lock": {
    "id": "line.bram.lock",
    "kind": "voice-line",
    "prompt": "Identify fresh blue wax inside the display lock.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "A clean impression would make a duplicate. There is fresh blue wax in the ward; see it on my thumbnail.",
      "direction": "Focused craftsman explaining physical evidence."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "clue"
    ]
  },
  "line.bram.reconsider": {
    "id": "line.bram.reconsider",
    "kind": "voice-line",
    "prompt": "Accept the detective's correction and resume helping.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Facts before suspects this time. Hand me the lamp.",
      "direction": "Still stern, but cooperation restored."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "trust"
    ]
  },
  "line.bram.reveal": {
    "id": "line.bram.reveal",
    "kind": "voice-line",
    "prompt": "Notice the strained folio clasp during the reveal.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "The clasp is under strain.",
      "direction": "Quiet technical confirmation."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal"
    ]
  },
  "line.bram.work-order": {
    "id": "line.bram.work-order",
    "kind": "voice-line",
    "prompt": "Produce the signed work order as exculpatory evidence.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Signed at six-ten. Mercer could sack me and still expect the job done properly.",
      "direction": "Vindicated but bitter; emphasize the precise time."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "clue"
    ]
  },
  "line.bram.wrong": {
    "id": "line.bram.wrong",
    "kind": "voice-line",
    "prompt": "Reject a premature accusation with working-class contempt.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "You have motive, you say. Bring me method and proof, or stop wasting the dark.",
      "direction": "Blunt anger, but the challenge is fair."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "bram",
      "accusation"
    ]
  },
  "line.detective.ada-opening": {
    "id": "line.detective.ada-opening",
    "kind": "voice-line",
    "prompt": "Calmly establish the first suspect and the central fact.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Ada Mercer. The Raven Ledger vanished while you were at the piano.",
      "direction": "Quiet authority; invite an answer without open hostility."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "detective"
    ]
  },
  "line.detective.bram-opening": {
    "id": "line.detective.bram-opening",
    "kind": "voice-line",
    "prompt": "Firmly frame the suspicious facts around Bram.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Bram Holt. A dead alarm and a dark room put you close to this.",
      "direction": "Blunt, testing his reaction rather than pronouncing guilt."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "detective"
    ]
  },
  "line.detective.closing": {
    "id": "line.detective.closing",
    "kind": "voice-line",
    "prompt": "Finish the case on a restrained verbal turn.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "So you tried to bury the page.",
      "direction": "Low, final, with disappointment rather than celebration."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal"
    ]
  },
  "line.detective.lucien-opening": {
    "id": "line.detective.lucien-opening",
    "kind": "voice-line",
    "prompt": "Open the historian interview with respectful precision.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Dr. Vale. You authenticated the ledger. Start with the blackout.",
      "direction": "Controlled and observant; do not reveal suspicion yet."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "detective"
    ]
  },
  "line.detective.reveal-container": {
    "id": "line.detective.reveal-container",
    "kind": "voice-line",
    "prompt": "Infer the hiding place when the optional auditory clue was missed.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "That folio is the only container in this room no one inspected.",
      "direction": "Cool logical certainty."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal",
      "conditional"
    ]
  },
  "line.detective.reveal-folio": {
    "id": "line.detective.reveal-folio",
    "kind": "voice-line",
    "prompt": "Name the optional auditory clue decisively.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Ada heard your folio snap shut while the case stood open.",
      "direction": "Crisp and certain, closing the hiding-place argument."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal",
      "conditional"
    ]
  },
  "line.detective.reveal": {
    "id": "line.detective.reveal",
    "kind": "voice-line",
    "prompt": "Deliver the core deduction with gathering force.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "You planned around a clock that never chimed. Your lamp made the dark, and Ada's wax made the key.",
      "direction": "Measured triumph, each clause landing as a separate piece of proof."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal"
    ]
  },
  "line.lucien.blame-ada": {
    "id": "line.lucien.blame-ada",
    "kind": "voice-line",
    "prompt": "Exploit Ada's debt to redirect suspicion.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Ada's quarrel was audible from the hall. Sentiment does not settle a conservatory account.",
      "direction": "Sympathetic on the surface, quietly poisonous underneath."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "deflection"
    ]
  },
  "line.lucien.blame-bram": {
    "id": "line.lucien.blame-bram",
    "kind": "voice-line",
    "prompt": "Exploit Bram's dismissal and access to redirect suspicion.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Holt was dismissed this afternoon, yet remained beside an alarm only he knew was dead.",
      "direction": "Reasonable and forensic, concealing satisfaction."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "deflection"
    ]
  },
  "line.lucien.clock": {
    "id": "line.lucien.clock",
    "kind": "voice-line",
    "prompt": "Scramble for a replacement after the clock alibi collapses.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Then I heard another clock. A carriage clock, perhaps, from the hall.",
      "direction": "First real hesitation; recover polish by the second sentence."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ]
  },
  "line.lucien.confession": {
    "id": "line.lucien.confession",
    "kind": "voice-line",
    "prompt": "Confess the career-ending motive after the ledger is found.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "That page would have buried everything I built.",
      "direction": "Hollow, exhausted, no charm remaining."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "reveal"
    ]
  },
  "line.lucien.early": {
    "id": "line.lucien.early",
    "kind": "voice-line",
    "prompt": "Dismiss an accusation unsupported by a complete case.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "An accusation without timeline, method, and motive is theatre, Detective. I expected scholarship.",
      "direction": "Amused superiority masking a moment of fear."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "accusation"
    ]
  },
  "line.lucien.folio": {
    "id": "line.lucien.folio",
    "kind": "voice-line",
    "prompt": "Reject Ada's auditory clue about the folio.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Miss Mercer hears exactly what assists her, and forgets exactly what does not.",
      "direction": "Cruel composure, attacking the witness instead of the fact."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ]
  },
  "line.lucien.intro": {
    "id": "line.lucien.intro",
    "kind": "voice-line",
    "prompt": "Politely redirect suspicion toward the obvious suspects.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Of course. Though Holt had keys, and Miss Mercer has creditors. One should begin with the simple facts.",
      "direction": "Helpful paternal charm with a faintly rehearsed smoothness."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien"
    ]
  },
  "line.lucien.lamp": {
    "id": "line.lucien.lamp",
    "kind": "voice-line",
    "prompt": "Deflect the lamp sabotage evidence onto an unnamed planter.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Anyone could have planted the copper marker. Its location proves only that someone wished to implicate me.",
      "direction": "Controlled legalism, pace slightly faster than before."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ]
  },
  "line.lucien.motive": {
    "id": "line.lucien.motive",
    "kind": "voice-line",
    "prompt": "Deny that the anachronistic watermark destroys his career.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Mercer enjoyed humiliating colleagues. He had insinuation, not proof.",
      "direction": "Bitter flash breaking through cultivated restraint."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ]
  },
  "line.lucien.refuse": {
    "id": "line.lucien.refuse",
    "kind": "voice-line",
    "prompt": "Refuse the final demand to open the folio.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "My folio is private correspondence. You have no authority to open it.",
      "direction": "The polish finally cracking into fear."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "reveal"
    ]
  },
  "line.lucien.timeline": {
    "id": "line.lucien.timeline",
    "kind": "voice-line",
    "prompt": "Give the crucial false account of the silent clock and Bram's toolbox.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "The mantel clock struck nine. On the first chime, darkness; on the second, Holt's tool case clicked beside the display.",
      "direction": "Precise, polished, too certain in every detail."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "lie"
    ]
  },
  "line.lucien.watermark": {
    "id": "line.lucien.watermark",
    "kind": "voice-line",
    "prompt": "Dismiss the incriminating watermark as collector drama.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "A collector's melodrama. The watermark changes nothing about my research.",
      "direction": "Smooth dismissal with a tiny tightening on watermark."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "lie"
    ]
  },
  "line.lucien.wax": {
    "id": "line.lucien.wax",
    "kind": "voice-line",
    "prompt": "Deny the wax connection by blaming Bram.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Then Holt used her wax. Surely even you can see how neatly it fits him.",
      "direction": "Patronizing, with strain under the final words."
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ]
  },
  "voice.ada": {
    "id": "voice.ada",
    "kind": "voice",
    "prompt": "Intelligent British woman in her late twenties, musical controlled delivery with a brittle edge, proud, emotionally precise.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "You hear debt and imagine guilt. I hear a room full of people eager to be believed."
    },
    "linkedAnimationAssets": {
      "intro": {
        "label": "Opening",
        "assetId": "line.ada.intro"
      },
      "debt": {
        "label": "The debt",
        "assetId": "line.ada.debt"
      },
      "trust": {
        "label": "Trust",
        "assetId": "line.ada.trust"
      },
      "defensive": {
        "label": "Defensive",
        "assetId": "line.ada.defensive"
      },
      "clock": {
        "label": "Silent clock",
        "assetId": "line.ada.clock"
      },
      "wax": {
        "label": "Blue wax",
        "assetId": "line.ada.wax"
      },
      "threat": {
        "label": "Mercer's threat",
        "assetId": "line.ada.threat"
      },
      "dark": {
        "label": "Sounds in darkness",
        "assetId": "line.ada.dark"
      },
      "bram": {
        "label": "Bram's work order",
        "assetId": "line.ada.bram"
      },
      "apology": {
        "label": "Accept apology",
        "assetId": "line.ada.apology"
      },
      "wrong": {
        "label": "Wrong accusation",
        "assetId": "line.ada.wrong"
      },
      "reveal": {
        "label": "Open the folio",
        "assetId": "line.ada.reveal"
      }
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "voice",
      "suspect",
      "ada"
    ]
  },
  "voice.bram": {
    "id": "voice.bram",
    "kind": "voice",
    "prompt": "Weathered British working man in his late forties, rough baritone, blunt and defensive but fundamentally steady and honest.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "Wires tell the truth. People generally need a little more testing."
    },
    "linkedAnimationAssets": {
      "intro": {
        "label": "Opening",
        "assetId": "line.bram.intro"
      },
      "alarm": {
        "label": "Disabled alarm",
        "assetId": "line.bram.alarm"
      },
      "work-order": {
        "label": "Work order",
        "assetId": "line.bram.work-order"
      },
      "hostile": {
        "label": "Hostile",
        "assetId": "line.bram.hostile"
      },
      "breaker": {
        "label": "Main breaker",
        "assetId": "line.bram.breaker"
      },
      "lock": {
        "label": "Wax in lock",
        "assetId": "line.bram.lock"
      },
      "lamp": {
        "label": "Sabotaged lamp",
        "assetId": "line.bram.lamp"
      },
      "reconsider": {
        "label": "Reconsider",
        "assetId": "line.bram.reconsider"
      },
      "wrong": {
        "label": "Wrong accusation",
        "assetId": "line.bram.wrong"
      },
      "reveal": {
        "label": "Folio clasp",
        "assetId": "line.bram.reveal"
      }
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "voice",
      "suspect",
      "bram"
    ]
  },
  "voice.detective": {
    "id": "voice.detective",
    "kind": "voice",
    "prompt": "Measured private detective, low and observant, concise authority, thoughtful rather than theatrical, 1930s mystery cadence.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "A lie is only a borrowed alibi. Eventually, its owner asks for it back."
    },
    "linkedAnimationAssets": {
      "ada-opening": {
        "label": "Question Ada",
        "assetId": "line.detective.ada-opening"
      },
      "bram-opening": {
        "label": "Question Bram",
        "assetId": "line.detective.bram-opening"
      },
      "lucien-opening": {
        "label": "Question Lucien",
        "assetId": "line.detective.lucien-opening"
      },
      "reveal": {
        "label": "Present the case",
        "assetId": "line.detective.reveal"
      },
      "reveal-folio": {
        "label": "Folio clue",
        "assetId": "line.detective.reveal-folio"
      },
      "reveal-container": {
        "label": "Container deduction",
        "assetId": "line.detective.reveal-container"
      },
      "closing": {
        "label": "Close the case",
        "assetId": "line.detective.closing"
      }
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "voice",
      "detective"
    ]
  },
  "voice.lucien": {
    "id": "voice.lucien",
    "kind": "voice",
    "prompt": "Cultivated silver-haired British historian, smooth resonant voice, impeccable diction and paternal charm hiding a vein of panic.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "History is not what happened, Detective. It is what survives examination."
    },
    "linkedAnimationAssets": {
      "intro": {
        "label": "Opening",
        "assetId": "line.lucien.intro"
      },
      "timeline": {
        "label": "False timeline",
        "assetId": "line.lucien.timeline"
      },
      "watermark": {
        "label": "Watermark denial",
        "assetId": "line.lucien.watermark"
      },
      "blame-ada": {
        "label": "Blame Ada",
        "assetId": "line.lucien.blame-ada"
      },
      "blame-bram": {
        "label": "Blame Bram",
        "assetId": "line.lucien.blame-bram"
      },
      "clock": {
        "label": "Clock confrontation",
        "assetId": "line.lucien.clock"
      },
      "lamp": {
        "label": "Lamp confrontation",
        "assetId": "line.lucien.lamp"
      },
      "wax": {
        "label": "Wax confrontation",
        "assetId": "line.lucien.wax"
      },
      "motive": {
        "label": "Motive confrontation",
        "assetId": "line.lucien.motive"
      },
      "folio": {
        "label": "Folio confrontation",
        "assetId": "line.lucien.folio"
      },
      "early": {
        "label": "Early accusation",
        "assetId": "line.lucien.early"
      },
      "refuse": {
        "label": "Refuse folio",
        "assetId": "line.lucien.refuse"
      },
      "confession": {
        "label": "Confession",
        "assetId": "line.lucien.confession"
      }
    },
    "activeVersion": "",
    "versions": {},
    "tags": [
      "voice",
      "suspect",
      "lucien"
    ]
  }
},
{
  "styleGuide": {
    "prompt": "Sophisticated 1930s locked-room mystery, painterly graphic-novel shapes, deep navy shadows, warm brass light, oxblood and teal accents, elegant silhouettes, restrained texture, cinematic but readable at game scale."
  }
}
);
assets.assetPaths = {
  "background.library": [
    "Graphics",
    "Background"
  ],
  "character.ada": [
    "Graphics",
    "Characters"
  ],
  "character.bram": [
    "Graphics",
    "Characters"
  ],
  "character.lucien": [
    "Graphics",
    "Characters"
  ],
  "line.ada.apology": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.bram": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.clock": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.dark": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.debt": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.defensive": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.intro": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.reveal": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.threat": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.trust": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.wax": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.ada.wrong": [
    "Voices",
    "Lines",
    "Ada"
  ],
  "line.bram.alarm": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.breaker": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.hostile": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.intro": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.lamp": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.lock": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.reconsider": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.reveal": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.work-order": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.bram.wrong": [
    "Voices",
    "Lines",
    "Bram"
  ],
  "line.detective.ada-opening": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.bram-opening": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.closing": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.lucien-opening": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.reveal-container": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.reveal-folio": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.reveal": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.lucien.blame-ada": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.blame-bram": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.clock": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.confession": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.early": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.folio": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.intro": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.lamp": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.motive": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.refuse": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.timeline": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.watermark": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.wax": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "voice.ada": [
    "Voices"
  ],
  "voice.bram": [
    "Voices"
  ],
  "voice.detective": [
    "Voices"
  ],
  "voice.lucien": [
    "Voices"
  ]
};
