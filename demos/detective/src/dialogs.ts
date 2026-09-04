import { defineDialogManifest } from "@dialog-designer/core";

export const dialogs = defineDialogManifest(
{
  "schemaVersion": 1,
  "dialogs": {
    "dialog.intro": {
      "id": "dialog.intro",
      "name": "The Facts of the Case",
      "entryNodeId": "case.intro",
      "enabled": true,
      "tags": [
        "case",
        "intro",
        "mandatory"
      ],
      "metadata": {
        "subtitle": "Blackwood House · the locked-library theft"
      },
      "nodes": {
        "case.intro": {
          "id": "case.intro",
          "type": "block",
          "name": "The facts of the case",
          "enabled": true,
          "lines": [
            {
              "id": "case.intro.victim",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.case-victim"
            },
            {
              "id": "case.intro.locked-room",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.case-locked-room"
            },
            {
              "id": "case.intro.blackout",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.case-blackout"
            },
            {
              "id": "case.intro.ada",
              "enabled": true,
              "voiceAssetId": "voice.ada",
              "lineAssetId": "line.ada.case-presence"
            },
            {
              "id": "case.intro.bram",
              "enabled": true,
              "voiceAssetId": "voice.bram",
              "lineAssetId": "line.bram.case-presence"
            },
            {
              "id": "case.intro.lucien",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.case-presence"
            },
            {
              "id": "case.intro.watermark",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.case-watermark"
            },
            {
              "id": "case.intro.dispute",
              "enabled": true,
              "voiceAssetId": "voice.lucien",
              "lineAssetId": "line.lucien.case-dispute"
            },
            {
              "id": "case.intro.questions",
              "enabled": true,
              "voiceAssetId": "voice.detective",
              "lineAssetId": "line.detective.case-questioning"
            }
          ]
        }
      }
    },
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
          "prompt": "Which part of Ada's account will you test?",
          "enabled": true,
          "options": [
            {
              "id": "ada.ask.debt",
              "text": "Ask what her argument with Edwin was about",
              "enabled": true,
              "nextNodeId": "ada.debt"
            },
            {
              "id": "ada.ask.clock",
              "text": "Tell her Vale claims the mantel clock chimed",
              "enabled": true,
              "nextNodeId": "ada.clock"
            },
            {
              "id": "ada.ask.wax",
              "text": "Show her the blue wax found in the lock",
              "enabled": true,
              "nextNodeId": "ada.wax"
            },
            {
              "id": "ada.ask.threat",
              "text": "Ask what Edwin said to Vale before leaving",
              "enabled": true,
              "nextNodeId": "ada.threat"
            },
            {
              "id": "ada.ask.dark",
              "text": "Have her reconstruct the sounds in the dark",
              "enabled": true,
              "nextNodeId": "ada.dark"
            },
            {
              "id": "ada.ask.bram",
              "text": "Ask whether Bram's repair order was genuine",
              "enabled": true,
              "nextNodeId": "ada.bram"
            },
            {
              "id": "ada.ask.apologize",
              "text": "Admit the accusation was premature",
              "enabled": true,
              "nextNodeId": "ada.apology"
            },
            {
              "id": "ada.accuse.wrong",
              "text": "Accuse Ada based on her debt",
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
          "prompt": "Ada admits the debt and pawn ticket. How do you respond?",
          "enabled": true,
          "options": [
            {
              "id": "ada.debt.protect",
              "text": "Treat the debt as private, not proof",
              "enabled": true,
              "nextNodeId": "ada.trust"
            },
            {
              "id": "ada.debt.press",
              "text": "Claim the debt gives her a motive to steal",
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
          "prompt": "Which part of Bram's technical account will you test?",
          "enabled": true,
          "options": [
            {
              "id": "bram.ask.alarm",
              "text": "Ask why he disabled the display alarm",
              "enabled": true,
              "nextNodeId": "bram.alarm"
            },
            {
              "id": "bram.ask.breaker",
              "text": "Ask whether the main breaker caused the blackout",
              "enabled": true,
              "nextNodeId": "bram.breaker"
            },
            {
              "id": "bram.ask.lock",
              "text": "Ask how the locked display case was opened",
              "enabled": true,
              "nextNodeId": "bram.lock"
            },
            {
              "id": "bram.ask.lamp",
              "text": "Have him trace the short circuit inside the room",
              "enabled": true,
              "nextNodeId": "bram.lamp"
            },
            {
              "id": "bram.ask.reconsider",
              "text": "Withdraw the accusation and ask for his help",
              "enabled": true,
              "nextNodeId": "bram.reconsider"
            },
            {
              "id": "bram.accuse.wrong",
              "text": "Accuse Bram based on access and dismissal",
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
          "prompt": "Bram says Edwin authorized the alarm shutdown. What next?",
          "enabled": true,
          "options": [
            {
              "id": "bram.alarm.proof",
              "text": "Ask to see Edwin's signed work order",
              "enabled": true,
              "nextNodeId": "bram.work-order"
            },
            {
              "id": "bram.alarm.press",
              "text": "Call the work order a lie",
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
          "prompt": "Which part of Vale's account will you test?",
          "enabled": true,
          "options": [
            {
              "id": "lucien.ask.timeline",
              "text": "Ask for the exact sequence during the blackout",
              "enabled": true,
              "nextNodeId": "lucien.timeline"
            },
            {
              "id": "lucien.ask.watermark",
              "text": "Ask what the 1846 watermark would prove",
              "enabled": true,
              "nextNodeId": "lucien.watermark"
            },
            {
              "id": "lucien.ask.blame-ada",
              "text": "Hear his case against Ada",
              "enabled": true,
              "nextNodeId": "lucien.blame-ada"
            },
            {
              "id": "lucien.ask.blame-bram",
              "text": "Hear his case against Bram",
              "enabled": true,
              "nextNodeId": "lucien.blame-bram"
            },
            {
              "id": "lucien.confront.clock",
              "text": "Tell him Ada stopped the clock before nine",
              "enabled": true,
              "nextNodeId": "lucien.clock"
            },
            {
              "id": "lucien.confront.lamp",
              "text": "Show him the copper marker from his lamp",
              "enabled": true,
              "nextNodeId": "lucien.lamp"
            },
            {
              "id": "lucien.confront.wax",
              "text": "Connect Ada's wax to the duplicate key",
              "enabled": true,
              "nextNodeId": "lucien.wax"
            },
            {
              "id": "lucien.confront.motive",
              "text": "Explain why an 1846 mark ruins his 1812 claim",
              "enabled": true,
              "nextNodeId": "lucien.motive"
            },
            {
              "id": "lucien.ask.folio",
              "text": "Ask why his folio clasp shut in the dark",
              "enabled": true,
              "nextNodeId": "lucien.folio"
            },
            {
              "id": "lucien.accuse.early",
              "text": "Accuse Vale before proving the full case",
              "enabled": true,
              "nextNodeId": "lucien.early"
            },
            {
              "id": "lucien.accuse.final",
              "text": "Accuse Vale with timeline, method, and motive",
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
          "prompt": "Vale refuses. The complete case gives you grounds to search his folio.",
          "enabled": true,
          "options": [
            {
              "id": "lucien.final.open",
              "text": "Present the evidence and inspect the folio",
              "enabled": true,
              "nextNodeId": "lucien.reveal"
            },
            {
              "id": "lucien.final.wait",
              "text": "Step back and continue questioning",
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
    "dialog.intro": [
      "Case"
    ],
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
