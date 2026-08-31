import { defineDialogManifest } from "@dialog-designer/core";

export const dialogs = defineDialogManifest(
{
  "schemaVersion": 1,
  "dialogs": {
    "dialog.ada": {
      "id": "dialog.ada",
      "name": "Ada Mercer",
      "entryNodeId": "ada.intro",
      "enabled": true,
      "tags": [
        "suspect",
        "ada"
      ],
      "metadata": {
        "suspectId": "ada",
        "subtitle": "The pianist · daughter of the collector"
      },
      "nodes": {
        "ada.intro": {
          "id": "ada.intro",
          "type": "block",
          "name": "Opening",
          "enabled": true,
          "nextNodeId": "ada.menu",
          "lines": [
            {
              "id": "ada.intro.detective",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.ada-opening"
            },
            {
              "id": "ada.intro.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.intro"
            }
          ]
        },
        "ada.menu": {
          "id": "ada.menu",
          "type": "decision",
          "name": "Interview topics",
          "prompt": "What will you ask Ada?",
          "enabled": true,
          "options": [
            {
              "id": "ada.ask.debt",
              "text": "Ask about her debts",
              "enabled": true,
              "nextNodeId": "ada.debt"
            },
            {
              "id": "ada.ask.clock",
              "text": "Challenge Vale's nine o'clock chime",
              "enabled": true,
              "nextNodeId": "ada.clock"
            },
            {
              "id": "ada.ask.wax",
              "text": "Ask about the blue sealing wax",
              "enabled": true,
              "nextNodeId": "ada.wax"
            },
            {
              "id": "ada.ask.threat",
              "text": "Ask what Mercer said to Vale",
              "enabled": true,
              "nextNodeId": "ada.threat"
            },
            {
              "id": "ada.ask.dark",
              "text": "Ask what she heard in the dark",
              "enabled": true,
              "nextNodeId": "ada.dark"
            },
            {
              "id": "ada.ask.bram",
              "text": "Ask about Bram's work order",
              "enabled": true,
              "nextNodeId": "ada.bram"
            },
            {
              "id": "ada.ask.apologize",
              "text": "Apologize and start again",
              "enabled": true,
              "nextNodeId": "ada.apology"
            },
            {
              "id": "ada.accuse.wrong",
              "text": "Accuse Ada of taking the ledger",
              "enabled": true,
              "nextNodeId": "ada.wrong"
            },
            {
              "id": "ada.leave",
              "text": "End the interview",
              "enabled": true
            }
          ]
        },
        "ada.debt": {
          "id": "ada.debt",
          "type": "block",
          "name": "The debt",
          "enabled": true,
          "nextNodeId": "ada.debt-choice",
          "lines": [
            {
              "id": "ada.debt.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.debt"
            }
          ]
        },
        "ada.debt-choice": {
          "id": "ada.debt-choice",
          "type": "decision",
          "name": "Respond to Ada",
          "prompt": "How do you use what Ada admitted?",
          "enabled": true,
          "options": [
            {
              "id": "ada.debt.protect",
              "text": "Keep it confidential; ask for her help",
              "enabled": true,
              "nextNodeId": "ada.trust"
            },
            {
              "id": "ada.debt.press",
              "text": "Say the ledger would pay more than tuition",
              "enabled": true,
              "nextNodeId": "ada.defensive"
            }
          ]
        },
        "ada.trust": {
          "id": "ada.trust",
          "type": "block",
          "name": "A careful truce",
          "enabled": true,
          "lines": [
            {
              "id": "ada.trust.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.trust"
            }
          ]
        },
        "ada.defensive": {
          "id": "ada.defensive",
          "type": "block",
          "name": "Ada closes down",
          "enabled": true,
          "lines": [
            {
              "id": "ada.defensive.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.defensive"
            }
          ]
        },
        "ada.clock": {
          "id": "ada.clock",
          "type": "block",
          "name": "The silent clock",
          "enabled": true,
          "lines": [
            {
              "id": "ada.clock.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.clock"
            }
          ]
        },
        "ada.wax": {
          "id": "ada.wax",
          "type": "block",
          "name": "Borrowed blue wax",
          "enabled": true,
          "lines": [
            {
              "id": "ada.wax.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.wax"
            }
          ]
        },
        "ada.threat": {
          "id": "ada.threat",
          "type": "block",
          "name": "The watermark threat",
          "enabled": true,
          "lines": [
            {
              "id": "ada.threat.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.threat"
            }
          ]
        },
        "ada.dark": {
          "id": "ada.dark",
          "type": "block",
          "name": "Sounds in darkness",
          "enabled": true,
          "lines": [
            {
              "id": "ada.dark.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.dark"
            }
          ]
        },
        "ada.bram": {
          "id": "ada.bram",
          "type": "block",
          "name": "The signed work slip",
          "enabled": true,
          "lines": [
            {
              "id": "ada.bram.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.bram"
            }
          ]
        },
        "ada.apology": {
          "id": "ada.apology",
          "type": "block",
          "name": "Repairing trust",
          "enabled": true,
          "lines": [
            {
              "id": "ada.apology.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.apology"
            }
          ]
        },
        "ada.wrong": {
          "id": "ada.wrong",
          "type": "block",
          "name": "A wrong accusation",
          "enabled": true,
          "lines": [
            {
              "id": "ada.wrong.reply",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.wrong"
            }
          ]
        }
      }
    },
    "dialog.bram": {
      "id": "dialog.bram",
      "name": "Bram Holt",
      "entryNodeId": "bram.intro",
      "enabled": true,
      "tags": [
        "suspect",
        "bram"
      ],
      "metadata": {
        "suspectId": "bram",
        "subtitle": "The electrician · dismissed this afternoon"
      },
      "nodes": {
        "bram.intro": {
          "id": "bram.intro",
          "type": "block",
          "name": "Opening",
          "enabled": true,
          "nextNodeId": "bram.menu",
          "lines": [
            {
              "id": "bram.intro.detective",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.bram-opening"
            },
            {
              "id": "bram.intro.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.intro"
            }
          ]
        },
        "bram.menu": {
          "id": "bram.menu",
          "type": "decision",
          "name": "Interview topics",
          "prompt": "What will you ask Bram?",
          "enabled": true,
          "options": [
            {
              "id": "bram.ask.alarm",
              "text": "Ask why the display alarm was dead",
              "enabled": true,
              "nextNodeId": "bram.alarm"
            },
            {
              "id": "bram.ask.breaker",
              "text": "Ask what tripped the power",
              "enabled": true,
              "nextNodeId": "bram.breaker"
            },
            {
              "id": "bram.ask.lock",
              "text": "Have him inspect the display lock",
              "enabled": true,
              "nextNodeId": "bram.lock"
            },
            {
              "id": "bram.ask.lamp",
              "text": "Trace the fault inside the room",
              "enabled": true,
              "nextNodeId": "bram.lamp"
            },
            {
              "id": "bram.ask.reconsider",
              "text": "Withdraw the accusation and ask for facts",
              "enabled": true,
              "nextNodeId": "bram.reconsider"
            },
            {
              "id": "bram.accuse.wrong",
              "text": "Accuse Bram of taking the ledger",
              "enabled": true,
              "nextNodeId": "bram.wrong"
            },
            {
              "id": "bram.leave",
              "text": "End the interview",
              "enabled": true
            }
          ]
        },
        "bram.alarm": {
          "id": "bram.alarm",
          "type": "block",
          "name": "The disabled alarm",
          "enabled": true,
          "nextNodeId": "bram.alarm-choice",
          "lines": [
            {
              "id": "bram.alarm.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.alarm"
            }
          ]
        },
        "bram.alarm-choice": {
          "id": "bram.alarm-choice",
          "type": "decision",
          "name": "Respond to Bram",
          "prompt": "How do you answer Bram's admission?",
          "enabled": true,
          "options": [
            {
              "id": "bram.alarm.proof",
              "text": "Ask to see Mercer's work order",
              "enabled": true,
              "nextNodeId": "bram.work-order"
            },
            {
              "id": "bram.alarm.press",
              "text": "Call the order a convenient invention",
              "enabled": true,
              "nextNodeId": "bram.hostile"
            }
          ]
        },
        "bram.work-order": {
          "id": "bram.work-order",
          "type": "block",
          "name": "The signed order",
          "enabled": true,
          "lines": [
            {
              "id": "bram.work-order.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.work-order"
            }
          ]
        },
        "bram.hostile": {
          "id": "bram.hostile",
          "type": "block",
          "name": "Bram refuses",
          "enabled": true,
          "lines": [
            {
              "id": "bram.hostile.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.hostile"
            }
          ]
        },
        "bram.breaker": {
          "id": "bram.breaker",
          "type": "block",
          "name": "The untouched breaker",
          "enabled": true,
          "lines": [
            {
              "id": "bram.breaker.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.breaker"
            }
          ]
        },
        "bram.lock": {
          "id": "bram.lock",
          "type": "block",
          "name": "Wax in the lock",
          "enabled": true,
          "lines": [
            {
              "id": "bram.lock.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.lock"
            }
          ]
        },
        "bram.lamp": {
          "id": "bram.lamp",
          "type": "block",
          "name": "The sabotaged lamp",
          "enabled": true,
          "lines": [
            {
              "id": "bram.lamp.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.lamp"
            }
          ]
        },
        "bram.reconsider": {
          "id": "bram.reconsider",
          "type": "block",
          "name": "Back to the facts",
          "enabled": true,
          "lines": [
            {
              "id": "bram.reconsider.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.reconsider"
            }
          ]
        },
        "bram.wrong": {
          "id": "bram.wrong",
          "type": "block",
          "name": "A wrong accusation",
          "enabled": true,
          "lines": [
            {
              "id": "bram.wrong.reply",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.wrong"
            }
          ]
        }
      }
    },
    "dialog.lucien": {
      "id": "dialog.lucien",
      "name": "Dr. Lucien Vale",
      "entryNodeId": "lucien.intro",
      "enabled": true,
      "tags": [
        "suspect",
        "lucien"
      ],
      "metadata": {
        "suspectId": "lucien",
        "subtitle": "The historian · authenticator of the ledger"
      },
      "nodes": {
        "lucien.intro": {
          "id": "lucien.intro",
          "type": "block",
          "name": "Opening",
          "enabled": true,
          "nextNodeId": "lucien.menu",
          "lines": [
            {
              "id": "lucien.intro.detective",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.lucien-opening"
            },
            {
              "id": "lucien.intro.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.intro"
            }
          ]
        },
        "lucien.menu": {
          "id": "lucien.menu",
          "type": "decision",
          "name": "Interview topics",
          "prompt": "What will you ask Dr. Vale?",
          "enabled": true,
          "options": [
            {
              "id": "lucien.ask.timeline",
              "text": "Have him recount the blackout",
              "enabled": true,
              "nextNodeId": "lucien.timeline"
            },
            {
              "id": "lucien.ask.watermark",
              "text": "Ask why Mercer mentioned a watermark",
              "enabled": true,
              "nextNodeId": "lucien.watermark"
            },
            {
              "id": "lucien.ask.blame-ada",
              "text": "Let him make the case against Ada",
              "enabled": true,
              "nextNodeId": "lucien.blame-ada"
            },
            {
              "id": "lucien.ask.blame-bram",
              "text": "Let him make the case against Bram",
              "enabled": true,
              "nextNodeId": "lucien.blame-bram"
            },
            {
              "id": "lucien.confront.clock",
              "text": "Expose the impossible clock chime",
              "enabled": true,
              "nextNodeId": "lucien.clock"
            },
            {
              "id": "lucien.confront.lamp",
              "text": "Confront him with the sabotaged lamp",
              "enabled": true,
              "nextNodeId": "lucien.lamp"
            },
            {
              "id": "lucien.confront.wax",
              "text": "Connect his wax to the duplicate key",
              "enabled": true,
              "nextNodeId": "lucien.wax"
            },
            {
              "id": "lucien.confront.motive",
              "text": "Explain what the watermark proves",
              "enabled": true,
              "nextNodeId": "lucien.motive"
            },
            {
              "id": "lucien.ask.folio",
              "text": "Ask why his folio snapped shut",
              "enabled": true,
              "nextNodeId": "lucien.folio"
            },
            {
              "id": "lucien.accuse.early",
              "text": "Accuse Vale without a complete case",
              "enabled": true,
              "nextNodeId": "lucien.early"
            },
            {
              "id": "lucien.accuse.final",
              "text": "Present the complete case against Vale",
              "enabled": true,
              "nextNodeId": "lucien.refuse"
            },
            {
              "id": "lucien.leave",
              "text": "End the interview",
              "enabled": true
            }
          ]
        },
        "lucien.timeline": {
          "id": "lucien.timeline",
          "type": "block",
          "name": "A rehearsed timeline",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.timeline.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.timeline"
            }
          ]
        },
        "lucien.watermark": {
          "id": "lucien.watermark",
          "type": "block",
          "name": "The watermark",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.watermark.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.watermark"
            }
          ]
        },
        "lucien.blame-ada": {
          "id": "lucien.blame-ada",
          "type": "block",
          "name": "Deflect toward Ada",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.blame-ada.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.blame-ada"
            }
          ]
        },
        "lucien.blame-bram": {
          "id": "lucien.blame-bram",
          "type": "block",
          "name": "Deflect toward Bram",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.blame-bram.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.blame-bram"
            }
          ]
        },
        "lucien.clock": {
          "id": "lucien.clock",
          "type": "block",
          "name": "The clock contradiction",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.clock.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.clock"
            }
          ]
        },
        "lucien.lamp": {
          "id": "lucien.lamp",
          "type": "block",
          "name": "The copper marker",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.lamp.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.lamp"
            }
          ]
        },
        "lucien.wax": {
          "id": "lucien.wax",
          "type": "block",
          "name": "The duplicate key",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.wax.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.wax"
            }
          ]
        },
        "lucien.motive": {
          "id": "lucien.motive",
          "type": "block",
          "name": "A career built on a lie",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.motive.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.motive"
            }
          ]
        },
        "lucien.folio": {
          "id": "lucien.folio",
          "type": "block",
          "name": "The clasped folio",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.folio.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.folio"
            }
          ]
        },
        "lucien.early": {
          "id": "lucien.early",
          "type": "block",
          "name": "An early accusation",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.early.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.early"
            }
          ]
        },
        "lucien.refuse": {
          "id": "lucien.refuse",
          "type": "block",
          "name": "Open the folio",
          "enabled": true,
          "nextNodeId": "lucien.final-choice",
          "lines": [
            {
              "id": "lucien.refuse.reply",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.refuse"
            }
          ]
        },
        "lucien.final-choice": {
          "id": "lucien.final-choice",
          "type": "decision",
          "name": "The last move",
          "prompt": "Vale refuses to open the folio.",
          "enabled": true,
          "options": [
            {
              "id": "lucien.final.open",
              "text": "Ask Bram to open it",
              "enabled": true,
              "nextNodeId": "lucien.reveal"
            },
            {
              "id": "lucien.final.wait",
              "text": "Not yet — return to the interviews",
              "enabled": true
            }
          ]
        },
        "lucien.reveal": {
          "id": "lucien.reveal",
          "type": "block",
          "name": "The Silent Ledger",
          "enabled": true,
          "lines": [
            {
              "id": "lucien.reveal.case",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.reveal"
            },
            {
              "id": "lucien.reveal.folio-clue",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.reveal-folio"
            },
            {
              "id": "lucien.reveal.container",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.reveal-container"
            },
            {
              "id": "lucien.reveal.bram",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.reveal"
            },
            {
              "id": "lucien.reveal.ada",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.reveal"
            },
            {
              "id": "lucien.reveal.confession",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.confession"
            },
            {
              "id": "lucien.reveal.close",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.closing"
            }
          ]
        }
      }
    }
  },
  "dialogPaths": {
    "dialog.ada": [
      "Suspects"
    ],
    "dialog.bram": [
      "Suspects"
    ],
    "dialog.lucien": [
      "Suspects"
    ]
  }
}
);
