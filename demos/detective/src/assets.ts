import { defineAiAssets } from "@ai-game-assets/core";

export const assets = defineAiAssets(
{
  "background.library": {
    "id": "background.library",
    "kind": "image",
    "prompt": "a storm-lit 1930s private library with shelves, window, lamps on the sides, and an emptied display case in the back. only the 10% to the right and left should have item stacks, the center needs to be available for characters to stand on (no characters in this image, though)",
    "dimensions": {
      "width": 960,
      "height": 640
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "opaque",
      "format": "png"
    },
    "activeVersion": "promoted-1788319816398",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/background.library.default.svg",
        "prompt": "Deterministic vector illustration of a storm-lit 1930s private library with shelves, window, lamps and an emptied display case.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      },
      "promoted-1788319134493": {
        "name": "promoted-1788319134493",
        "file": "/assets/background.library.promoted-1788319134493.png",
        "prompt": "Deterministic vector illustration of a storm-lit 1930s private library with shelves, window, lamps and an emptied display case.",
        "createdAt": "2026-09-02T03:18:54.535Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "opaque",
          "format": "png"
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "default",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788319816398": {
        "name": "promoted-1788319816398",
        "file": "/assets/background.library.promoted-1788319816398.png",
        "prompt": "a storm-lit 1930s private library with shelves, window, lamps on the sides, and an emptied display case in the back. only the 10% to the right and left should have item stacks, the center needs to be available for characters to stand on (no characters in this image, though)",
        "createdAt": "2026-09-02T03:30:16.463Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "opaque",
          "format": "png"
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "promoted-1788319134493",
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "background",
      "library",
      "mystery"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.ada.idle": {
    "id": "character.ada.idle",
    "kind": "spritesheet",
    "prompt": "Ada Mercer idle loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence with only subtle breathing and one natural blink. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, or change the character between frames. Transparent background.",
    "dimensions": {
      "width": 640,
      "height": 840
    },
    "frameGrid": {
      "frameCount": 4,
      "frameWidth": 320,
      "frameHeight": 420,
      "columns": 2,
      "rows": 2
    },
    "animations": [
      {
        "key": "character.ada.idle",
        "frames": [
          0,
          1,
          2,
          3
        ],
        "frameRate": 3,
        "repeat": -1
      }
    ],
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "quality": "low",
      "format": "png",
      "frameAlignment": "center",
      "referenceAssetIds": [
        "character.ada"
      ]
    },
    "activeVersion": "first-draft-1788492896050-1",
    "versions": {
      "first-draft-1788492896050-1": {
        "name": "first-draft-1788492896050-1",
        "file": "/assets/character.ada.idle.first-draft-1788492896050-1.png",
        "prompt": "Ada Mercer idle loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames with only subtle breathing and one natural blink. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, or change the character between frames. Transparent background.",
        "createdAt": "2026-09-04T03:34:56.056Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.ada"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "notes": "Auto-generated first draft for a missing asset."
      }
    },
    "tags": [
      "character",
      "suspect",
      "ada",
      "animation",
      "idle"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.ada": {
    "id": "character.ada",
    "kind": "image",
    "prompt": "A female pianist in a dark red 1930s evening dress. no piano, she is standing in a natural pose facing the camera.",
    "dimensions": {
      "width": 320,
      "height": 420
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "format": "png"
    },
    "linkedAnimationAssets": {
      "idle": {
        "label": "Idle",
        "assetId": "character.ada.idle"
      },
      "speaking": {
        "label": "Speaking",
        "assetId": "character.ada.speaking"
      }
    },
    "activeVersion": "promoted-1788492141177",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/character.ada.default.svg",
        "prompt": "Deterministic vector character portrait of Ada Mercer in a dark red 1930s evening dress.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      },
      "promoted-1788319411742": {
        "name": "promoted-1788319411742",
        "file": "/assets/character.ada.promoted-1788319411742.png",
        "prompt": "A female pianist in a dark red 1930s evening dress. no piano, she is standing in a natural pose facing the camera.",
        "createdAt": "2026-09-02T03:23:31.798Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "format": "png",
          "referenceAssetIds": [
            "background.library"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "default",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788492141177": {
        "name": "promoted-1788492141177",
        "file": "/assets/character.ada.promoted-1788492141177.png",
        "prompt": "A female pianist in a dark red 1930s evening dress. no piano, she is standing in a natural pose facing the camera.",
        "createdAt": "2026-09-04T03:22:21.232Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "format": "png"
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "promoted-1788319411742",
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "character",
      "suspect",
      "ada"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.ada.speaking": {
    "id": "character.ada.speaking",
    "kind": "spritesheet",
    "prompt": "Ada Mercer speaking loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence of quiet, intelligent conversation using small mouth-shape changes, a slight eyebrow or head movement, no hand gestures. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
    "dimensions": {
      "width": 960,
      "height": 1260
    },
    "frameGrid": {
      "frameCount": 8,
      "frameWidth": 320,
      "frameHeight": 420,
      "columns": 3,
      "rows": 3
    },
    "animations": [
      {
        "key": "character.ada.speaking",
        "frameRate": 6,
        "repeat": -1,
        "frames": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ]
      }
    ],
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "quality": "low",
      "format": "png",
      "frameAlignment": "center",
      "referenceAssetIds": [
        "character.ada"
      ]
    },
    "activeVersion": "promoted-1788572866868",
    "versions": {
      "first-draft-1788492914672-2": {
        "name": "first-draft-1788492914672-2",
        "file": "/assets/character.ada.speaking.first-draft-1788492914672-2.png",
        "prompt": "Ada Mercer speaking loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames of quiet, intelligent conversation using small mouth-shape changes, a slight eyebrow or head movement, and one restrained hand gesture. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
        "createdAt": "2026-09-04T03:35:14.692Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.ada"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "notes": "Auto-generated first draft for a missing asset."
      },
      "promoted-1788557526977-1": {
        "name": "promoted-1788557526977-1",
        "file": "/assets/character.ada.speaking.promoted-1788557526977-1.png",
        "prompt": "Ada Mercer speaking loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames of quiet, intelligent conversation using small mouth-shape changes, a slight eyebrow or head movement, and one restrained hand gesture. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
        "createdAt": "2026-09-04T21:32:07.049Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.ada"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "first-draft-1788492914672-2",
        "notes": "Promoted from the AI asset designer with Promote all."
      },
      "promoted-1788557809316": {
        "name": "promoted-1788557809316",
        "file": "/assets/character.ada.speaking.promoted-1788557809316.png",
        "prompt": "Ada Mercer speaking loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames of quiet, intelligent conversation using small mouth-shape changes, a slight eyebrow or head movement, no hand gestures. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
        "createdAt": "2026-09-04T21:36:49.347Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.ada"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "promoted-1788557526977-1",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788572866868": {
        "name": "promoted-1788572866868",
        "file": "/assets/character.ada.speaking.promoted-1788572866868.png",
        "prompt": "Ada Mercer speaking loop, matching character.ada exactly: preserve her face, hairstyle, dark red 1930s evening dress, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence of quiet, intelligent conversation using small mouth-shape changes, a slight eyebrow or head movement, no hand gestures. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep her body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
        "createdAt": "2026-09-05T01:47:46.892Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.ada"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "promoted-1788557809316",
        "notes": "Generated with isolated per-frame composition to prevent cross-cell bleed."
      }
    },
    "tags": [
      "character",
      "suspect",
      "ada",
      "animation",
      "speaking"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.bram.idle": {
    "id": "character.bram.idle",
    "kind": "spritesheet",
    "prompt": "Bram Holt idle loop, matching character.bram exactly: preserve his face, hair, electrician's work clothes, tool satchel, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence with only subtle breathing, a small weight shift through the shoulders, and one natural blink. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, and keep the satchel, clothing, and facial details consistent. Do not translate, crop, resize, rotate, add props, or change the character between frames. Transparent background.",
    "dimensions": {
      "width": 640,
      "height": 840
    },
    "frameGrid": {
      "frameCount": 4,
      "frameWidth": 320,
      "frameHeight": 420,
      "columns": 2,
      "rows": 2
    },
    "animations": [
      {
        "key": "character.bram.idle",
        "frames": [
          0,
          1,
          2,
          3
        ],
        "frameRate": 3,
        "repeat": -1
      }
    ],
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "quality": "low",
      "format": "png",
      "frameAlignment": "center",
      "referenceAssetIds": [
        "character.bram"
      ]
    },
    "activeVersion": "first-draft-1788492931191-3",
    "versions": {
      "first-draft-1788492931191-3": {
        "name": "first-draft-1788492931191-3",
        "file": "/assets/character.bram.idle.first-draft-1788492931191-3.png",
        "prompt": "Bram Holt idle loop, matching character.bram exactly: preserve his face, hair, electrician's work clothes, tool satchel, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames with only subtle breathing, a small weight shift through the shoulders, and one natural blink. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, and keep the satchel, clothing, and facial details consistent. Do not translate, crop, resize, rotate, add props, or change the character between frames. Transparent background.",
        "createdAt": "2026-09-04T03:35:31.209Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.bram"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "notes": "Auto-generated first draft for a missing asset."
      }
    },
    "tags": [
      "character",
      "suspect",
      "bram",
      "animation",
      "idle"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.bram": {
    "id": "character.bram",
    "kind": "image",
    "prompt": "An electrician with work clothes and tool satchel, he is standing in a natural pose facing the camera.",
    "dimensions": {
      "width": 320,
      "height": 420
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "format": "png"
    },
    "linkedAnimationAssets": {
      "idle": {
        "label": "Idle",
        "assetId": "character.bram.idle"
      },
      "speaking": {
        "label": "Speaking",
        "assetId": "character.bram.speaking"
      }
    },
    "activeVersion": "promoted-1788492180743",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/character.bram.default.svg",
        "prompt": "Deterministic vector character portrait of Bram Holt with work clothes and tool satchel.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      },
      "promoted-1788319491850": {
        "name": "promoted-1788319491850",
        "file": "/assets/character.bram.promoted-1788319491850.png",
        "prompt": "An electrician with work clothes and tool satchel, he is standing in a natural pose facing the camera.",
        "createdAt": "2026-09-02T03:24:51.892Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "format": "png",
          "referenceAssetIds": [
            "background.library"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "default",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788492180743": {
        "name": "promoted-1788492180743",
        "file": "/assets/character.bram.promoted-1788492180743.png",
        "prompt": "An electrician with work clothes and tool satchel, he is standing in a natural pose facing the camera.",
        "createdAt": "2026-09-04T03:23:00.794Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "format": "png"
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "promoted-1788319491850",
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "character",
      "suspect",
      "bram"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.bram.speaking": {
    "id": "character.bram.speaking",
    "kind": "spritesheet",
    "prompt": "Bram Holt speaking loop, matching character.bram exactly: preserve his face, hair, electrician's work clothes, tool satchel, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence of guarded, practical conversation using small mouth-shape changes, a slight head movement, and one restrained free-hand gesture. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, and keep the satchel, clothing, and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
    "dimensions": {
      "width": 640,
      "height": 840
    },
    "frameGrid": {
      "frameCount": 4,
      "frameWidth": 320,
      "frameHeight": 420,
      "columns": 2,
      "rows": 2
    },
    "animations": [
      {
        "key": "character.bram.speaking",
        "frames": [
          0,
          1,
          2,
          3
        ],
        "frameRate": 6,
        "repeat": -1
      }
    ],
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "quality": "low",
      "format": "png",
      "frameAlignment": "center",
      "referenceAssetIds": [
        "character.bram"
      ]
    },
    "activeVersion": "first-draft-1788492947395-4",
    "versions": {
      "first-draft-1788492947395-4": {
        "name": "first-draft-1788492947395-4",
        "file": "/assets/character.bram.speaking.first-draft-1788492947395-4.png",
        "prompt": "Bram Holt speaking loop, matching character.bram exactly: preserve his face, hair, electrician's work clothes, tool satchel, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames of guarded, practical conversation using small mouth-shape changes, a slight head movement, and one restrained free-hand gesture. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, and keep the satchel, clothing, and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
        "createdAt": "2026-09-04T03:35:47.414Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.bram"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "notes": "Auto-generated first draft for a missing asset."
      }
    },
    "tags": [
      "character",
      "suspect",
      "bram",
      "animation",
      "speaking"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.lucien.idle": {
    "id": "character.lucien.idle",
    "kind": "spritesheet",
    "prompt": "Dr. Lucien Vale idle loop, matching character.lucien exactly: preserve his older face, hair, midnight suit, clasped folio, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence with only subtle breathing, a minute posture adjustment, and one natural blink. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, keep both hands and the folio controlled, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, or change the character between frames. Transparent background.",
    "dimensions": {
      "width": 640,
      "height": 840
    },
    "frameGrid": {
      "frameCount": 4,
      "frameWidth": 320,
      "frameHeight": 420,
      "columns": 2,
      "rows": 2
    },
    "animations": [
      {
        "key": "character.lucien.idle",
        "frames": [
          0,
          1,
          2,
          3
        ],
        "frameRate": 3,
        "repeat": -1
      }
    ],
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "quality": "low",
      "format": "png",
      "frameAlignment": "center",
      "referenceAssetIds": [
        "character.lucien"
      ]
    },
    "activeVersion": "first-draft-1788492964595-5",
    "versions": {
      "first-draft-1788492964595-5": {
        "name": "first-draft-1788492964595-5",
        "file": "/assets/character.lucien.idle.first-draft-1788492964595-5.png",
        "prompt": "Dr. Lucien Vale idle loop, matching character.lucien exactly: preserve his older face, hair, midnight suit, clasped folio, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames with only subtle breathing, a minute posture adjustment, and one natural blink. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, keep both hands and the folio controlled, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, or change the character between frames. Transparent background.",
        "createdAt": "2026-09-04T03:36:04.614Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.lucien"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "notes": "Auto-generated first draft for a missing asset."
      }
    },
    "tags": [
      "character",
      "suspect",
      "lucien",
      "animation",
      "idle"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.lucien": {
    "id": "character.lucien",
    "kind": "image",
    "prompt": "Dr. Lucien Vale, old and respectable, with a midnight suit and clasped folio. He is standing in a natural position facing the camera.",
    "dimensions": {
      "width": 320,
      "height": 420
    },
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "format": "png"
    },
    "linkedAnimationAssets": {
      "idle": {
        "label": "Idle",
        "assetId": "character.lucien.idle"
      },
      "speaking": {
        "label": "Speaking",
        "assetId": "character.lucien.speaking"
      }
    },
    "activeVersion": "promoted-1788492217832",
    "versions": {
      "default": {
        "name": "default",
        "file": "/assets/character.lucien.default.svg",
        "prompt": "Deterministic vector character portrait of Dr. Lucien Vale with a midnight suit and clasped folio.",
        "createdAt": "2026-08-30T00:00:00.000Z",
        "model": "manual-svg"
      },
      "promoted-1788319574008": {
        "name": "promoted-1788319574008",
        "file": "/assets/character.lucien.promoted-1788319574008.png",
        "prompt": "Dr. Lucien Vale, old and respectable, with a midnight suit and clasped folio. He is standing in a natural position facing the camera.",
        "createdAt": "2026-09-02T03:26:14.054Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "format": "png",
          "referenceAssetIds": [
            "background.library"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "default",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788492217832": {
        "name": "promoted-1788492217832",
        "file": "/assets/character.lucien.promoted-1788492217832.png",
        "prompt": "Dr. Lucien Vale, old and respectable, with a midnight suit and clasped folio. He is standing in a natural position facing the camera.",
        "createdAt": "2026-09-04T03:23:37.887Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "format": "png"
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "parentVersion": "promoted-1788319574008",
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "character",
      "suspect",
      "lucien"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "character.lucien.speaking": {
    "id": "character.lucien.speaking",
    "kind": "spritesheet",
    "prompt": "Dr. Lucien Vale speaking loop, matching character.lucien exactly: preserve his older face, hair, midnight suit, clasped folio, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create a seamless full-body frame sequence of poised but guarded conversation using small mouth-shape changes, a slight eyebrow or head movement, and one restrained free-hand gesture while the folio remains secure. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
    "dimensions": {
      "width": 640,
      "height": 840
    },
    "frameGrid": {
      "frameCount": 4,
      "frameWidth": 320,
      "frameHeight": 420,
      "columns": 2,
      "rows": 2
    },
    "animations": [
      {
        "key": "character.lucien.speaking",
        "frames": [
          0,
          1,
          2,
          3
        ],
        "frameRate": 6,
        "repeat": -1
      }
    ],
    "settings": {
      "model": "gpt-image-2",
      "background": "transparent",
      "quality": "low",
      "format": "png",
      "frameAlignment": "center",
      "referenceAssetIds": [
        "character.lucien"
      ]
    },
    "activeVersion": "first-draft-1788492979963-6",
    "versions": {
      "first-draft-1788492979963-6": {
        "name": "first-draft-1788492979963-6",
        "file": "/assets/character.lucien.speaking.first-draft-1788492979963-6.png",
        "prompt": "Dr. Lucien Vale speaking loop, matching character.lucien exactly: preserve his older face, hair, midnight suit, clasped folio, proportions, silhouette, camera angle, scale, lighting, and painterly film-noir style. Create four seamless full-body frames of poised but guarded conversation using small mouth-shape changes, a slight eyebrow or head movement, and one restrained free-hand gesture while the folio remains secure. Keep both feet planted at exactly the same baseline and horizontal position in every frame, keep his body centered, and keep all clothing and facial details consistent. Do not translate, crop, resize, rotate, add props, speech bubbles, or text. Transparent background.",
        "createdAt": "2026-09-04T03:36:19.968Z",
        "model": "gpt-image-2",
        "settings": {
          "model": "gpt-image-2",
          "background": "transparent",
          "quality": "low",
          "format": "png",
          "frameAlignment": "center",
          "referenceAssetIds": [
            "character.lucien"
          ]
        },
        "audioSettings": {},
        "audioPlayback": {},
        "voiceSettings": {},
        "notes": "Auto-generated first draft for a missing asset."
      }
    },
    "tags": [
      "character",
      "suspect",
      "lucien",
      "animation",
      "speaking"
    ],
    "audioSettings": {},
    "audioPlayback": {},
    "voiceSettings": {}
  },
  "audio.music.noir": {
    "id": "audio.music.noir",
    "kind": "music",
    "prompt": "Original deterministic procedural film-noir score: brushed drums, upright bass, minor-key piano, and muted brass; instrumental, with no vocals, restrained, and loopable.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "durationSeconds": 27,
      "loop": true
    },
    "activeVersion": "promoted-1788318943446",
    "versions": {
      "original": {
        "name": "original",
        "file": "/assets/audio.music.noir.original.wav",
        "prompt": "Original deterministic procedural film-noir score: brushed drums, upright bass, minor-key piano, and muted brass; instrumental, with no vocals, restrained, and loopable.",
        "createdAt": "2026-09-01T00:00:00.000Z",
        "model": "procedural-synthesis",
        "settings": {},
        "audioSettings": {
          "provider": "procedural",
          "format": "wav",
          "durationSeconds": 27,
          "loop": true
        },
        "audioPlayback": {
          "volume": 0.18,
          "loop": true
        },
        "durationSeconds": 26.666667,
        "notes": "Original score generated deterministically by scripts/write-noir-score.mjs; contains no external samples."
      },
      "promoted-1788318888645": {
        "name": "promoted-1788318888645",
        "file": "/assets/audio.music.noir.promoted-1788318888645.mp3",
        "prompt": "Original deterministic procedural film-noir score: brushed drums, upright bass, minor-key piano, and muted brass; instrumental, with no vocals, restrained, and loopable.",
        "createdAt": "2026-09-02T03:14:48.943Z",
        "model": "uploaded",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "durationSeconds": 27,
          "loop": true
        },
        "audioPlayback": {
          "volume": 0.18,
          "loop": true
        },
        "voiceSettings": {},
        "durationSeconds": 298.4135,
        "parentVersion": "original",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788318918236": {
        "name": "promoted-1788318918236",
        "file": "/assets/audio.music.noir.promoted-1788318918236.mp3",
        "prompt": "Original deterministic procedural film-noir score: brushed drums, upright bass, minor-key piano, and muted brass; instrumental, with no vocals, restrained, and loopable.",
        "createdAt": "2026-09-02T03:15:18.349Z",
        "model": "uploaded",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "durationSeconds": 27,
          "loop": true
        },
        "audioPlayback": {
          "volume": 1.5,
          "loop": true,
          "trimStartSeconds": 0,
          "trimEndSeconds": 298.4135,
          "playbackRate": 1
        },
        "voiceSettings": {},
        "durationSeconds": 298.4135,
        "parentVersion": "promoted-1788318888645",
        "notes": "Promoted from the AI asset designer."
      },
      "promoted-1788318943446": {
        "name": "promoted-1788318943446",
        "file": "/assets/audio.music.noir.promoted-1788318943446.mp3",
        "prompt": "Original deterministic procedural film-noir score: brushed drums, upright bass, minor-key piano, and muted brass; instrumental, with no vocals, restrained, and loopable.",
        "createdAt": "2026-09-02T03:15:43.544Z",
        "model": "uploaded",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "durationSeconds": 27,
          "loop": true
        },
        "audioPlayback": {
          "volume": 0.18,
          "loop": true,
          "trimStartSeconds": 0,
          "trimEndSeconds": 298.4135,
          "playbackRate": 1
        },
        "voiceSettings": {},
        "durationSeconds": 298.4135,
        "parentVersion": "promoted-1788318918236",
        "notes": "Promoted from the AI asset designer."
      }
    },
    "settings": {},
    "audioPlayback": {
      "volume": 0.18,
      "loop": true,
      "trimStartSeconds": 0,
      "trimEndSeconds": 298.4135,
      "playbackRate": 1
    },
    "tags": [
      "music",
      "film-noir",
      "instrumental",
      "ambient"
    ],
    "voiceSettings": {}
  },
  "line.ada.apology": {
    "id": "line.ada.apology",
    "kind": "voice-line",
    "prompt": "cool, prideful restraint",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Do not mistake my forgiveness for forgetfulness, Detective. Ask your questions, but this time follow the evidence before you accuse me.",
      "direction": "cool, prideful restraint",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-11",
    "versions": {
      "promoted-1788229770463-11": {
        "name": "promoted-1788229770463-11",
        "file": "/assets/line.ada.apology.promoted-1788229770463-11.mp3",
        "prompt": "cool, prideful restraint",
        "createdAt": "2026-09-01T02:30:22.988Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Do not mistake my forgiveness for forgetfulness, Detective. Ask your questions, but this time follow the evidence before you accuse me.",
          "direction": "cool, prideful restraint",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-11": {
        "name": "promoted-1788308775025-11",
        "file": "/assets/line.ada.apology.promoted-1788308775025-11.mp3",
        "prompt": "cool, prideful restraint",
        "createdAt": "2026-09-02T00:27:02.913Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Do not mistake my forgiveness for forgetfulness, Detective. Ask your questions, but this time follow the evidence before you accuse me.",
          "direction": "cool, prideful restraint",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-11",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "trust"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.bram": {
    "id": "line.ada.bram",
    "kind": "voice-line",
    "prompt": "measured, reluctant certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Father gave Holt a signed alarm-repair order before dinner. They argued afterward, but the order was genuine.",
      "direction": "measured, reluctant certainty",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-10",
    "versions": {
      "promoted-1788229770463-10": {
        "name": "promoted-1788229770463-10",
        "file": "/assets/line.ada.bram.promoted-1788229770463-10.mp3",
        "prompt": "measured, reluctant certainty",
        "createdAt": "2026-09-01T02:30:18.493Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Father gave Holt a signed alarm-repair order before dinner. They argued afterward, but the order was genuine.",
          "direction": "measured, reluctant certainty",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-10": {
        "name": "promoted-1788308775025-10",
        "file": "/assets/line.ada.bram.promoted-1788308775025-10.mp3",
        "prompt": "measured, reluctant certainty",
        "createdAt": "2026-09-02T00:26:58.811Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Father gave Holt a signed alarm-repair order before dinner. They argued afterward, but the order was genuine.",
          "direction": "measured, reluctant certainty",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-10",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.case-presence": {
    "id": "line.ada.case-presence",
    "kind": "voice-line",
    "prompt": "formal, poised restraint",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "I'm Ada Mercer, Edwin's daughter. I was rehearsing at the library piano before Father's ten o'clock presentation.",
      "direction": "formal, poised restraint",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-1",
    "versions": {
      "promoted-1788229770463-1": {
        "name": "promoted-1788229770463-1",
        "file": "/assets/line.ada.case-presence.promoted-1788229770463-1.mp3",
        "prompt": "formal, poised restraint",
        "createdAt": "2026-09-01T02:29:35.116Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "I'm Ada Mercer, Edwin's daughter. I was rehearsing at the library piano before Father's ten o'clock presentation.",
          "direction": "formal, poised restraint",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-1": {
        "name": "promoted-1788308775025-1",
        "file": "/assets/line.ada.case-presence.promoted-1788308775025-1.mp3",
        "prompt": "formal, poised restraint",
        "createdAt": "2026-09-02T00:26:18.989Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "I'm Ada Mercer, Edwin's daughter. I was rehearsing at the library piano before Father's ten o'clock presentation.",
          "direction": "formal, poised restraint",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-1",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "intro"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.clock": {
    "id": "line.ada.clock",
    "kind": "voice-line",
    "prompt": "calm, unshakable certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "It could not have chimed. I stopped the pendulum at twenty to nine; its ticking throws off my tempo.",
      "direction": "calm, unshakable certainty",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-6",
    "versions": {
      "promoted-1788229770463-6": {
        "name": "promoted-1788229770463-6",
        "file": "/assets/line.ada.clock.promoted-1788229770463-6.mp3",
        "prompt": "calm, unshakable certainty",
        "createdAt": "2026-09-01T02:29:57.435Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "It could not have chimed. I stopped the pendulum at twenty to nine; its ticking throws off my tempo.",
          "direction": "calm, unshakable certainty",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-6": {
        "name": "promoted-1788308775025-6",
        "file": "/assets/line.ada.clock.promoted-1788308775025-6.mp3",
        "prompt": "calm, unshakable certainty",
        "createdAt": "2026-09-02T00:26:41.248Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "It could not have chimed. I stopped the pendulum at twenty to nine; its ticking throws off my tempo.",
          "direction": "calm, unshakable certainty",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-6",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.dark": {
    "id": "line.ada.dark",
    "kind": "voice-line",
    "prompt": "hushed, precise recollection",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "A lamp switch clicked. The display glass lifted. Then a folio clasp snapped. Vale's has a sharp brass catch; I had heard it all evening.",
      "direction": "hushed, precise recollection",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-9",
    "versions": {
      "promoted-1788229770463-9": {
        "name": "promoted-1788229770463-9",
        "file": "/assets/line.ada.dark.promoted-1788229770463-9.mp3",
        "prompt": "hushed, precise recollection",
        "createdAt": "2026-09-01T02:30:11.436Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "A lamp switch clicked. The display glass lifted. Then a folio clasp snapped. Vale's has a sharp brass catch; I had heard it all evening.",
          "direction": "hushed, precise recollection",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-9": {
        "name": "promoted-1788308775025-9",
        "file": "/assets/line.ada.dark.promoted-1788308775025-9.mp3",
        "prompt": "hushed, precise recollection",
        "createdAt": "2026-09-02T00:26:54.465Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "A lamp switch clicked. The display glass lifted. Then a folio clasp snapped. Vale's has a sharp brass catch; I had heard it all evening.",
          "direction": "hushed, precise recollection",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-9",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.debt": {
    "id": "line.ada.debt",
    "kind": "voice-line",
    "prompt": "vulnerable, restrained defiance",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Father found the pawn ticket for the brooch Mother left me. I used the money toward my conservatory debt. We argued because I wanted one choice in this house to be mine.",
      "direction": "vulnerable, restrained defiance",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-3",
    "versions": {
      "promoted-1788229770463-3": {
        "name": "promoted-1788229770463-3",
        "file": "/assets/line.ada.debt.promoted-1788229770463-3.mp3",
        "prompt": "vulnerable, restrained defiance",
        "createdAt": "2026-09-01T02:29:45.390Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Father found the pawn ticket for the brooch Mother left me. I used the money toward my conservatory debt. We argued because I wanted one choice in this house to be mine.",
          "direction": "vulnerable, restrained defiance",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-3": {
        "name": "promoted-1788308775025-3",
        "file": "/assets/line.ada.debt.promoted-1788308775025-3.mp3",
        "prompt": "vulnerable, restrained defiance",
        "createdAt": "2026-09-02T00:26:27.747Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Father found the pawn ticket for the brooch Mother left me. I used the money toward my conservatory debt. We argued because I wanted one choice in this house to be mine.",
          "direction": "vulnerable, restrained defiance",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-3",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "red-herring"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.defensive": {
    "id": "line.ada.defensive",
    "kind": "voice-line",
    "prompt": "wounded, cold finality",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Then you have found the answer you wanted, not the truth. Stop asking me for help until you are prepared to listen.",
      "direction": "wounded, cold finality",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-5",
    "versions": {
      "promoted-1788229770463-5": {
        "name": "promoted-1788229770463-5",
        "file": "/assets/line.ada.defensive.promoted-1788229770463-5.mp3",
        "prompt": "wounded, cold finality",
        "createdAt": "2026-09-01T02:29:53.651Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Then you have found the answer you wanted, not the truth. Stop asking me for help until you are prepared to listen.",
          "direction": "wounded, cold finality",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-5": {
        "name": "promoted-1788308775025-5",
        "file": "/assets/line.ada.defensive.promoted-1788308775025-5.mp3",
        "prompt": "wounded, cold finality",
        "createdAt": "2026-09-02T00:26:37.923Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Then you have found the answer you wanted, not the truth. Stop asking me for help until you are prepared to listen.",
          "direction": "wounded, cold finality",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-5",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "hostile"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.intro": {
    "id": "line.ada.intro",
    "kind": "voice-line",
    "prompt": "guarded, brittle composure",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Nothing once the lights failed. And yes, Father and I argued over money. I know how neatly that sounds.",
      "direction": "guarded, brittle composure",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-2",
    "versions": {
      "promoted-1788229770463-2": {
        "name": "promoted-1788229770463-2",
        "file": "/assets/line.ada.intro.promoted-1788229770463-2.mp3",
        "prompt": "guarded, brittle composure",
        "createdAt": "2026-09-01T02:29:40.006Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Nothing once the lights failed. And yes, Father and I argued over money. I know how neatly that sounds.",
          "direction": "guarded, brittle composure",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-2": {
        "name": "promoted-1788308775025-2",
        "file": "/assets/line.ada.intro.promoted-1788308775025-2.mp3",
        "prompt": "guarded, brittle composure",
        "createdAt": "2026-09-02T00:26:23.237Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Nothing once the lights failed. And yes, Father and I argued over money. I know how neatly that sounds.",
          "direction": "guarded, brittle composure",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-2",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.reveal": {
    "id": "line.ada.reveal",
    "kind": "voice-line",
    "prompt": "urgent, commanding resolve",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Open the folio, Detective. If the clasp is straining around something rigid, then we should all see what Dr. Vale has hidden inside.",
      "direction": "urgent, commanding resolve",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-13",
    "versions": {
      "promoted-1788229770463-13": {
        "name": "promoted-1788229770463-13",
        "file": "/assets/line.ada.reveal.promoted-1788229770463-13.mp3",
        "prompt": "urgent, commanding resolve",
        "createdAt": "2026-09-01T02:30:32.183Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Open the folio, Detective. If the clasp is straining around something rigid, then we should all see what Dr. Vale has hidden inside.",
          "direction": "urgent, commanding resolve",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-13": {
        "name": "promoted-1788308775025-13",
        "file": "/assets/line.ada.reveal.promoted-1788308775025-13.mp3",
        "prompt": "urgent, commanding resolve",
        "createdAt": "2026-09-02T00:27:10.759Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Open the folio, Detective. If the clasp is straining around something rigid, then we should all see what Dr. Vale has hidden inside.",
          "direction": "urgent, commanding resolve",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-13",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.threat": {
    "id": "line.ada.threat",
    "kind": "voice-line",
    "prompt": "grave, uneasy recollection",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Father told Vale, ‘At ten, the 1846 watermark ends your 1812 lie.’ Vale looked as though he had been struck.",
      "direction": "grave, uneasy recollection",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-8",
    "versions": {
      "promoted-1788229770463-8": {
        "name": "promoted-1788229770463-8",
        "file": "/assets/line.ada.threat.promoted-1788229770463-8.mp3",
        "prompt": "grave, uneasy recollection",
        "createdAt": "2026-09-01T02:30:06.761Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Father told Vale, ‘At ten, the 1846 watermark ends your 1812 lie.’ Vale looked as though he had been struck.",
          "direction": "grave, uneasy recollection",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-8": {
        "name": "promoted-1788308775025-8",
        "file": "/assets/line.ada.threat.promoted-1788308775025-8.mp3",
        "prompt": "grave, uneasy recollection",
        "createdAt": "2026-09-02T00:26:49.293Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Father told Vale, ‘At ten, the 1846 watermark ends your 1812 lie.’ Vale looked as though he had been struck.",
          "direction": "grave, uneasy recollection",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-8",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.trust": {
    "id": "line.ada.trust",
    "kind": "voice-line",
    "prompt": "softening, quietly resolute",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "All right. You kept my confidence, so I will give you the room exactly as I remember it, sound by sound, without protecting anyone.",
      "direction": "softening, quietly resolute",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-4",
    "versions": {
      "promoted-1788229770463-4": {
        "name": "promoted-1788229770463-4",
        "file": "/assets/line.ada.trust.promoted-1788229770463-4.mp3",
        "prompt": "softening, quietly resolute",
        "createdAt": "2026-09-01T02:29:50.219Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "All right. You kept my confidence, so I will give you the room exactly as I remember it, sound by sound, without protecting anyone.",
          "direction": "softening, quietly resolute",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-4": {
        "name": "promoted-1788308775025-4",
        "file": "/assets/line.ada.trust.promoted-1788308775025-4.mp3",
        "prompt": "softening, quietly resolute",
        "createdAt": "2026-09-02T00:26:34.223Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "All right. You kept my confidence, so I will give you the room exactly as I remember it, sound by sound, without protecting anyone.",
          "direction": "softening, quietly resolute",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-4",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "trust"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.wax": {
    "id": "line.ada.wax",
    "kind": "voice-line",
    "prompt": "careful, quietly uneasy",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "My sealing wax is blue. Dr. Vale borrowed a stick on Tuesday; he said the seal on one of his catalogue folios had split.",
      "direction": "careful, quietly uneasy",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-7",
    "versions": {
      "promoted-1788229770463-7": {
        "name": "promoted-1788229770463-7",
        "file": "/assets/line.ada.wax.promoted-1788229770463-7.mp3",
        "prompt": "careful, quietly uneasy",
        "createdAt": "2026-09-01T02:30:01.673Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "My sealing wax is blue. Dr. Vale borrowed a stick on Tuesday; he said the seal on one of his catalogue folios had split.",
          "direction": "careful, quietly uneasy",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-7": {
        "name": "promoted-1788308775025-7",
        "file": "/assets/line.ada.wax.promoted-1788308775025-7.mp3",
        "prompt": "careful, quietly uneasy",
        "createdAt": "2026-09-02T00:26:45.195Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "My sealing wax is blue. Dr. Vale borrowed a stick on Tuesday; he said the seal on one of his catalogue folios had split.",
          "direction": "careful, quietly uneasy",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-7",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.ada.wrong": {
    "id": "line.ada.wrong",
    "kind": "voice-line",
    "prompt": "icy, simmering indignation",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.ada",
      "text": "Search me. When you find nothing, decide whether you wanted a culprit or merely a convenient woman to blame for this theft.",
      "direction": "icy, simmering indignation",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "activeVersion": "promoted-1788308775025-12",
    "versions": {
      "promoted-1788229770463-12": {
        "name": "promoted-1788229770463-12",
        "file": "/assets/line.ada.wrong.promoted-1788229770463-12.mp3",
        "prompt": "icy, simmering indignation",
        "createdAt": "2026-09-01T02:30:26.975Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Search me. When you find nothing, decide whether you wanted a culprit or merely a convenient woman to blame for this theft.",
          "direction": "icy, simmering indignation",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308775025-12": {
        "name": "promoted-1788308775025-12",
        "file": "/assets/line.ada.wrong.promoted-1788308775025-12.mp3",
        "prompt": "icy, simmering indignation",
        "createdAt": "2026-09-02T00:27:06.782Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.ada",
          "text": "Search me. When you find nothing, decide whether you wanted a culprit or merely a convenient woman to blame for this theft.",
          "direction": "icy, simmering indignation",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "parentVersion": "promoted-1788229770463-12",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "ada",
      "accusation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.alarm": {
    "id": "line.bram.alarm",
    "kind": "voice-line",
    "prompt": "plainspoken, professional assurance",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Edwin ordered it disconnected. The failing contacts kept sounding false alarms; I was to replace them before the presentation.",
      "direction": "plainspoken, professional assurance",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-3",
    "versions": {
      "promoted-1788229946338-3": {
        "name": "promoted-1788229946338-3",
        "file": "/assets/line.bram.alarm.promoted-1788229946338-3.mp3",
        "prompt": "plainspoken, professional assurance",
        "createdAt": "2026-09-01T02:32:38.758Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Edwin ordered it disconnected. The failing contacts kept sounding false alarms; I was to replace them before the presentation.",
          "direction": "plainspoken, professional assurance",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-3": {
        "name": "promoted-1788308830791-3",
        "file": "/assets/line.bram.alarm.promoted-1788308830791-3.mp3",
        "prompt": "plainspoken, professional assurance",
        "createdAt": "2026-09-02T00:27:21.165Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Edwin ordered it disconnected. The failing contacts kept sounding false alarms; I was to replace them before the presentation.",
          "direction": "plainspoken, professional assurance",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-3",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "red-herring"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.breaker": {
    "id": "line.bram.breaker",
    "kind": "voice-line",
    "prompt": "precise, technical certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "The main breaker never tripped. Only the library circuit failed, so the short began inside this room.",
      "direction": "precise, technical certainty",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-6",
    "versions": {
      "promoted-1788229946338-6": {
        "name": "promoted-1788229946338-6",
        "file": "/assets/line.bram.breaker.promoted-1788229946338-6.mp3",
        "prompt": "precise, technical certainty",
        "createdAt": "2026-09-01T02:32:51.258Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "The main breaker never tripped. Only the library circuit failed, so the short began inside this room.",
          "direction": "precise, technical certainty",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-6": {
        "name": "promoted-1788308830791-6",
        "file": "/assets/line.bram.breaker.promoted-1788308830791-6.mp3",
        "prompt": "precise, technical certainty",
        "createdAt": "2026-09-02T00:27:30.195Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "The main breaker never tripped. Only the library circuit failed, so the short began inside this room.",
          "direction": "precise, technical certainty",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-6",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.case-presence": {
    "id": "line.bram.case-presence",
    "kind": "voice-line",
    "prompt": "reserved, workmanlike formality",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Bram Holt, estate electrician. Mr. Mercer ordered me to disconnect the faulty display alarm and install new contacts before the presentation.",
      "direction": "reserved, workmanlike formality",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-1",
    "versions": {
      "promoted-1788229946338-1": {
        "name": "promoted-1788229946338-1",
        "file": "/assets/line.bram.case-presence.promoted-1788229946338-1.mp3",
        "prompt": "reserved, workmanlike formality",
        "createdAt": "2026-09-01T02:32:30.674Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Bram Holt, estate electrician. Mr. Mercer ordered me to disconnect the faulty display alarm and install new contacts before the presentation.",
          "direction": "reserved, workmanlike formality",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-1": {
        "name": "promoted-1788308830791-1",
        "file": "/assets/line.bram.case-presence.promoted-1788308830791-1.mp3",
        "prompt": "reserved, workmanlike formality",
        "createdAt": "2026-09-02T00:27:14.894Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Bram Holt, estate electrician. Mr. Mercer ordered me to disconnect the faulty display alarm and install new contacts before the presentation.",
          "direction": "reserved, workmanlike formality",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-1",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "intro"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.hostile": {
    "id": "line.bram.hostile",
    "kind": "voice-line",
    "prompt": "clipped, offended refusal",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "If you have already decided I am lying, inspect the wiring yourself. I will not help you dress up a guess and call it evidence.",
      "direction": "clipped, offended refusal",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-5",
    "versions": {
      "promoted-1788229946338-5": {
        "name": "promoted-1788229946338-5",
        "file": "/assets/line.bram.hostile.promoted-1788229946338-5.mp3",
        "prompt": "clipped, offended refusal",
        "createdAt": "2026-09-01T02:32:46.894Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "If you have already decided I am lying, inspect the wiring yourself. I will not help you dress up a guess and call it evidence.",
          "direction": "clipped, offended refusal",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-5": {
        "name": "promoted-1788308830791-5",
        "file": "/assets/line.bram.hostile.promoted-1788308830791-5.mp3",
        "prompt": "clipped, offended refusal",
        "createdAt": "2026-09-02T00:27:27.907Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "If you have already decided I am lying, inspect the wiring yourself. I will not help you dress up a guess and call it evidence.",
          "direction": "clipped, offended refusal",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-5",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "hostile"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.intro": {
    "id": "line.bram.intro",
    "kind": "voice-line",
    "prompt": "firm, controlled defensiveness",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "An ugly fact is not the same thing as a guilty one, Detective. Ask about the wiring, and I will tell you exactly what failed.",
      "direction": "firm, controlled defensiveness",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-2",
    "versions": {
      "promoted-1788229946338-2": {
        "name": "promoted-1788229946338-2",
        "file": "/assets/line.bram.intro.promoted-1788229946338-2.mp3",
        "prompt": "firm, controlled defensiveness",
        "createdAt": "2026-09-01T02:32:34.343Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "An ugly fact is not the same thing as a guilty one, Detective. Ask about the wiring, and I will tell you exactly what failed.",
          "direction": "firm, controlled defensiveness",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-2": {
        "name": "promoted-1788308830791-2",
        "file": "/assets/line.bram.intro.promoted-1788308830791-2.mp3",
        "prompt": "firm, controlled defensiveness",
        "createdAt": "2026-09-02T00:27:18.029Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "An ugly fact is not the same thing as a guilty one, Detective. Ask about the wiring, and I will tell you exactly what failed.",
          "direction": "firm, controlled defensiveness",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-2",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.lamp": {
    "id": "line.bram.lamp",
    "kind": "voice-line",
    "prompt": "focused, mounting certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "The short began in Vale's reading lamp. His copper page marker was bent across the live contacts. That killed power to this room alone. Deliberate.",
      "direction": "focused, mounting certainty",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-8",
    "versions": {
      "promoted-1788229946338-8": {
        "name": "promoted-1788229946338-8",
        "file": "/assets/line.bram.lamp.promoted-1788229946338-8.mp3",
        "prompt": "focused, mounting certainty",
        "createdAt": "2026-09-01T02:33:02.007Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "The short began in Vale's reading lamp. His copper page marker was bent across the live contacts. That killed power to this room alone. Deliberate.",
          "direction": "focused, mounting certainty",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-8": {
        "name": "promoted-1788308830791-8",
        "file": "/assets/line.bram.lamp.promoted-1788308830791-8.mp3",
        "prompt": "focused, mounting certainty",
        "createdAt": "2026-09-02T00:27:38.577Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "The short began in Vale's reading lamp. His copper page marker was bent across the live contacts. That killed power to this room alone. Deliberate.",
          "direction": "focused, mounting certainty",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-8",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.lock": {
    "id": "line.bram.lock",
    "kind": "voice-line",
    "prompt": "methodical, forensic precision",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "I trained as a locksmith before I took up wiring. Someone pressed wax into this lock to copy its ward pattern—the shape a key must match. Fresh blue wax is still inside; see it on my thumbnail.",
      "direction": "methodical, forensic precision",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-7",
    "versions": {
      "promoted-1788229946338-7": {
        "name": "promoted-1788229946338-7",
        "file": "/assets/line.bram.lock.promoted-1788229946338-7.mp3",
        "prompt": "methodical, forensic precision",
        "createdAt": "2026-09-01T02:32:56.659Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "I trained as a locksmith before I took up wiring. Someone pressed wax into this lock to copy its ward pattern—the shape a key must match. Fresh blue wax is still inside; see it on my thumbnail.",
          "direction": "methodical, forensic precision",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-7": {
        "name": "promoted-1788308830791-7",
        "file": "/assets/line.bram.lock.promoted-1788308830791-7.mp3",
        "prompt": "methodical, forensic precision",
        "createdAt": "2026-09-02T00:27:34.907Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "I trained as a locksmith before I took up wiring. Someone pressed wax into this lock to copy its ward pattern—the shape a key must match. Fresh blue wax is still inside; see it on my thumbnail.",
          "direction": "methodical, forensic precision",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-7",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.reconsider": {
    "id": "line.bram.reconsider",
    "kind": "voice-line",
    "prompt": "grudging, renewed focus",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Facts before suspects this time. Hand me the lamp, and I will trace the fault from the contacts back to whoever caused it.",
      "direction": "grudging, renewed focus",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-9",
    "versions": {
      "promoted-1788229946338-9": {
        "name": "promoted-1788229946338-9",
        "file": "/assets/line.bram.reconsider.promoted-1788229946338-9.mp3",
        "prompt": "grudging, renewed focus",
        "createdAt": "2026-09-01T02:33:04.959Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Facts before suspects this time. Hand me the lamp, and I will trace the fault from the contacts back to whoever caused it.",
          "direction": "grudging, renewed focus",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-9": {
        "name": "promoted-1788308830791-9",
        "file": "/assets/line.bram.reconsider.promoted-1788308830791-9.mp3",
        "prompt": "grudging, renewed focus",
        "createdAt": "2026-09-02T00:27:43.290Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Facts before suspects this time. Hand me the lamp, and I will trace the fault from the contacts back to whoever caused it.",
          "direction": "grudging, renewed focus",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-9",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "trust"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.reveal": {
    "id": "line.bram.reveal",
    "kind": "voice-line",
    "prompt": "tense, careful warning",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "The clasp is under strain, as though something rigid has been forced inside the folio. Open it carefully; the catch may spring.",
      "direction": "tense, careful warning",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-11",
    "versions": {
      "promoted-1788229946338-11": {
        "name": "promoted-1788229946338-11",
        "file": "/assets/line.bram.reveal.promoted-1788229946338-11.mp3",
        "prompt": "tense, careful warning",
        "createdAt": "2026-09-01T02:33:14.080Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "The clasp is under strain, as though something rigid has been forced inside the folio. Open it carefully; the catch may spring.",
          "direction": "tense, careful warning",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-11": {
        "name": "promoted-1788308830791-11",
        "file": "/assets/line.bram.reveal.promoted-1788308830791-11.mp3",
        "prompt": "tense, careful warning",
        "createdAt": "2026-09-02T00:27:51.319Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "The clasp is under strain, as though something rigid has been forced inside the folio. Open it carefully; the catch may spring.",
          "direction": "tense, careful warning",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-11",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.work-order": {
    "id": "line.bram.work-order",
    "kind": "voice-line",
    "prompt": "terse, factual vindication",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "Signed at six-ten: disconnect the display alarm and replace its failing contacts. Edwin dismissed me after our argument and still expected the job finished.",
      "direction": "terse, factual vindication",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-4",
    "versions": {
      "promoted-1788229946338-4": {
        "name": "promoted-1788229946338-4",
        "file": "/assets/line.bram.work-order.promoted-1788229946338-4.mp3",
        "prompt": "terse, factual vindication",
        "createdAt": "2026-09-01T02:32:43.040Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Signed at six-ten: disconnect the display alarm and replace its failing contacts. Edwin dismissed me after our argument and still expected the job finished.",
          "direction": "terse, factual vindication",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-4": {
        "name": "promoted-1788308830791-4",
        "file": "/assets/line.bram.work-order.promoted-1788308830791-4.mp3",
        "prompt": "terse, factual vindication",
        "createdAt": "2026-09-02T00:27:24.413Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "Signed at six-ten: disconnect the display alarm and replace its failing contacts. Edwin dismissed me after our argument and still expected the job finished.",
          "direction": "terse, factual vindication",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-4",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "clue"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.bram.wrong": {
    "id": "line.bram.wrong",
    "kind": "voice-line",
    "prompt": "hard, contemptuous challenge",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.bram",
      "text": "You think dismissal gives me a motive. Bring me a method and evidence—or stop wasting time pretending suspicion is proof.",
      "direction": "hard, contemptuous challenge",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "activeVersion": "promoted-1788308830791-10",
    "versions": {
      "promoted-1788229946338-10": {
        "name": "promoted-1788229946338-10",
        "file": "/assets/line.bram.wrong.promoted-1788229946338-10.mp3",
        "prompt": "hard, contemptuous challenge",
        "createdAt": "2026-09-01T02:33:09.082Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "You think dismissal gives me a motive. Bring me a method and evidence—or stop wasting time pretending suspicion is proof.",
          "direction": "hard, contemptuous challenge",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308830791-10": {
        "name": "promoted-1788308830791-10",
        "file": "/assets/line.bram.wrong.promoted-1788308830791-10.mp3",
        "prompt": "hard, contemptuous challenge",
        "createdAt": "2026-09-02T00:27:47.867Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.bram",
          "text": "You think dismissal gives me a motive. Bring me a method and evidence—or stop wasting time pretending suspicion is proof.",
          "direction": "hard, contemptuous challenge",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "parentVersion": "promoted-1788229946338-10",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "bram",
      "accusation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.ada-opening": {
    "id": "line.detective.ada-opening",
    "kind": "voice-line",
    "prompt": "gentle, attentive inquiry",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Ada Mercer. You were at the piano when the Raven Ledger vanished. Tell me what you saw, heard, and noticed during those thirty seconds of darkness.",
      "direction": "gentle, attentive inquiry",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-6",
    "versions": {
      "promoted-1788229690995-6": {
        "name": "promoted-1788229690995-6",
        "file": "/assets/line.detective.ada-opening.promoted-1788229690995-6.mp3",
        "prompt": "gentle, attentive inquiry",
        "createdAt": "2026-09-01T02:28:48.855Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Ada Mercer. You were at the piano when the Raven Ledger vanished. Tell me what you saw, heard, and noticed during those thirty seconds of darkness.",
          "direction": "gentle, attentive inquiry",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-6": {
        "name": "promoted-1788308718588-6",
        "file": "/assets/line.detective.ada-opening.promoted-1788308718588-6.mp3",
        "prompt": "gentle, attentive inquiry",
        "createdAt": "2026-09-02T00:25:49.574Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Ada Mercer. You were at the piano when the Raven Ledger vanished. Tell me what you saw, heard, and noticed during those thirty seconds of darkness.",
          "direction": "gentle, attentive inquiry",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-6",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.bram-opening": {
    "id": "line.detective.bram-opening",
    "kind": "voice-line",
    "prompt": "firm, skeptical scrutiny",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Bram Holt. The display alarm was disabled, and the library went dark. Both put the electrician under scrutiny.",
      "direction": "firm, skeptical scrutiny",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-7",
    "versions": {
      "promoted-1788229690995-7": {
        "name": "promoted-1788229690995-7",
        "file": "/assets/line.detective.bram-opening.promoted-1788229690995-7.mp3",
        "prompt": "firm, skeptical scrutiny",
        "createdAt": "2026-09-01T02:28:52.154Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Bram Holt. The display alarm was disabled, and the library went dark. Both put the electrician under scrutiny.",
          "direction": "firm, skeptical scrutiny",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-7": {
        "name": "promoted-1788308718588-7",
        "file": "/assets/line.detective.bram-opening.promoted-1788308718588-7.mp3",
        "prompt": "firm, skeptical scrutiny",
        "createdAt": "2026-09-02T00:25:52.810Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Bram Holt. The display alarm was disabled, and the library went dark. Both put the electrician under scrutiny.",
          "direction": "firm, skeptical scrutiny",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-7",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.case-blackout": {
    "id": "line.detective.case-blackout",
    "kind": "voice-line",
    "prompt": "controlled, mounting intrigue",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "At nine, this room alone went dark for thirty seconds. The door remained locked, the windows stayed latched, and the original display-case key never left Edwin's pocket. Yet when he returned, the case was open and the ledger was gone.",
      "direction": "controlled, mounting intrigue",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-3",
    "versions": {
      "promoted-1788229690995-3": {
        "name": "promoted-1788229690995-3",
        "file": "/assets/line.detective.case-blackout.promoted-1788229690995-3.mp3",
        "prompt": "controlled, mounting intrigue",
        "createdAt": "2026-09-01T02:28:32.412Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "At nine, this room alone went dark for thirty seconds. The door remained locked, the windows stayed latched, and the original display-case key never left Edwin's pocket. Yet when he returned, the case was open and the ledger was gone.",
          "direction": "controlled, mounting intrigue",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-3": {
        "name": "promoted-1788308718588-3",
        "file": "/assets/line.detective.case-blackout.promoted-1788308718588-3.mp3",
        "prompt": "controlled, mounting intrigue",
        "createdAt": "2026-09-02T00:25:33.771Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "At nine, this room alone went dark for thirty seconds. The door remained locked, the windows stayed latched, and the original display-case key never left Edwin's pocket. Yet when he returned, the case was open and the ledger was gone.",
          "direction": "controlled, mounting intrigue",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-3",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective",
      "intro",
      "locked-room"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.case-locked-room": {
    "id": "line.detective.case-locked-room",
    "kind": "voice-line",
    "prompt": "measured, precise narration",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "At two minutes to nine, Edwin stepped into the hall to collect his guests. The library door locked behind him, leaving only Ada Mercer, Bram Holt, and Dr. Lucien Vale inside.",
      "direction": "measured, precise narration",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-2",
    "versions": {
      "promoted-1788229690995-2": {
        "name": "promoted-1788229690995-2",
        "file": "/assets/line.detective.case-locked-room.promoted-1788229690995-2.mp3",
        "prompt": "measured, precise narration",
        "createdAt": "2026-09-01T02:28:24.133Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "At two minutes to nine, Edwin stepped into the hall to collect his guests. The library door locked behind him, leaving only Ada Mercer, Bram Holt, and Dr. Lucien Vale inside.",
          "direction": "measured, precise narration",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-2": {
        "name": "promoted-1788308718588-2",
        "file": "/assets/line.detective.case-locked-room.promoted-1788308718588-2.mp3",
        "prompt": "measured, precise narration",
        "createdAt": "2026-09-02T00:25:27.411Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "At two minutes to nine, Edwin stepped into the hall to collect his guests. The library door locked behind him, leaving only Ada Mercer, Bram Holt, and Dr. Lucien Vale inside.",
          "direction": "measured, precise narration",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-2",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective",
      "intro"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.case-questioning": {
    "id": "line.detective.case-questioning",
    "kind": "voice-line",
    "prompt": "methodical, commanding clarity",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "I'll question each of you separately. We need three answers: who lied about the time, how the case was opened during a room-only blackout, and why the ledger had to disappear. One answer may unlock the next question.",
      "direction": "methodical, commanding clarity",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-5",
    "versions": {
      "promoted-1788229690995-5": {
        "name": "promoted-1788229690995-5",
        "file": "/assets/line.detective.case-questioning.promoted-1788229690995-5.mp3",
        "prompt": "methodical, commanding clarity",
        "createdAt": "2026-09-01T02:28:43.756Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "I'll question each of you separately. We need three answers: who lied about the time, how the case was opened during a room-only blackout, and why the ledger had to disappear. One answer may unlock the next question.",
          "direction": "methodical, commanding clarity",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-5": {
        "name": "promoted-1788308718588-5",
        "file": "/assets/line.detective.case-questioning.promoted-1788308718588-5.mp3",
        "prompt": "methodical, commanding clarity",
        "createdAt": "2026-09-02T00:25:45.867Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "I'll question each of you separately. We need three answers: who lied about the time, how the case was opened during a room-only blackout, and why the ledger had to disappear. One answer may unlock the next question.",
          "direction": "methodical, commanding clarity",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-5",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective",
      "intro"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.case-victim": {
    "id": "line.detective.case-victim",
    "kind": "voice-line",
    "prompt": "grave, crystal-clear authority",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Edwin Mercer, owner of Blackwood House, is tonight's victim. He is unharmed, but the rare Raven Ledger in his care has been stolen.",
      "direction": "grave, crystal-clear authority",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-1",
    "versions": {
      "promoted-1788229690995-1": {
        "name": "promoted-1788229690995-1",
        "file": "/assets/line.detective.case-victim.promoted-1788229690995-1.mp3",
        "prompt": "grave, crystal-clear authority",
        "createdAt": "2026-09-01T02:28:17.036Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Edwin Mercer, owner of Blackwood House, is tonight's victim. He is unharmed, but the rare Raven Ledger in his care has been stolen.",
          "direction": "grave, crystal-clear authority",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-1": {
        "name": "promoted-1788308718588-1",
        "file": "/assets/line.detective.case-victim.promoted-1788308718588-1.mp3",
        "prompt": "grave, crystal-clear authority",
        "createdAt": "2026-09-02T00:25:22.659Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Edwin Mercer, owner of Blackwood House, is tonight's victim. He is unharmed, but the rare Raven Ledger in his care has been stolen.",
          "direction": "grave, crystal-clear authority",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-1",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective",
      "intro"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.case-watermark": {
    "id": "line.detective.case-watermark",
    "kind": "voice-line",
    "prompt": "measured, ominous clarity",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Edwin's presentation concerned a watermark dated 1846. If genuine, it proves the supposedly 1812 ledger is a modern forgery—and ruins the scholarship on which Dr. Vale built his career.",
      "direction": "measured, ominous clarity",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-4",
    "versions": {
      "promoted-1788229690995-4": {
        "name": "promoted-1788229690995-4",
        "file": "/assets/line.detective.case-watermark.promoted-1788229690995-4.mp3",
        "prompt": "measured, ominous clarity",
        "createdAt": "2026-09-01T02:28:37.752Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Edwin's presentation concerned a watermark dated 1846. If genuine, it proves the supposedly 1812 ledger is a modern forgery—and ruins the scholarship on which Dr. Vale built his career.",
          "direction": "measured, ominous clarity",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-4": {
        "name": "promoted-1788308718588-4",
        "file": "/assets/line.detective.case-watermark.promoted-1788308718588-4.mp3",
        "prompt": "measured, ominous clarity",
        "createdAt": "2026-09-02T00:25:39.154Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Edwin's presentation concerned a watermark dated 1846. If genuine, it proves the supposedly 1812 ledger is a modern forgery—and ruins the scholarship on which Dr. Vale built his career.",
          "direction": "measured, ominous clarity",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-4",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective",
      "intro",
      "motive"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.closing": {
    "id": "line.detective.closing",
    "kind": "voice-line",
    "prompt": "final, unwavering condemnation",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "The duplicate key is here beside the ledger. You stole it to bury the proof that your life's work was built on a forgery.",
      "direction": "final, unwavering condemnation",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-12",
    "versions": {
      "promoted-1788229690995-12": {
        "name": "promoted-1788229690995-12",
        "file": "/assets/line.detective.closing.promoted-1788229690995-12.mp3",
        "prompt": "final, unwavering condemnation",
        "createdAt": "2026-09-01T02:29:18.066Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "The duplicate key is here beside the ledger. You stole it to bury the proof that your life's work was built on a forgery.",
          "direction": "final, unwavering condemnation",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-12": {
        "name": "promoted-1788308718588-12",
        "file": "/assets/line.detective.closing.promoted-1788308718588-12.mp3",
        "prompt": "final, unwavering condemnation",
        "createdAt": "2026-09-02T00:26:14.983Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "The duplicate key is here beside the ledger. You stole it to bury the proof that your life's work was built on a forgery.",
          "direction": "final, unwavering condemnation",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-12",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.lucien-opening": {
    "id": "line.detective.lucien-opening",
    "kind": "voice-line",
    "prompt": "courteous, incisive authority",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Dr. Vale, you authenticated the Raven Ledger and examined it tonight. Start with the blackout: where were you, and what did you hear in the dark?",
      "direction": "courteous, incisive authority",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-8",
    "versions": {
      "promoted-1788229690995-8": {
        "name": "promoted-1788229690995-8",
        "file": "/assets/line.detective.lucien-opening.promoted-1788229690995-8.mp3",
        "prompt": "courteous, incisive authority",
        "createdAt": "2026-09-01T02:28:55.842Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Dr. Vale, you authenticated the Raven Ledger and examined it tonight. Start with the blackout: where were you, and what did you hear in the dark?",
          "direction": "courteous, incisive authority",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-8": {
        "name": "promoted-1788308718588-8",
        "file": "/assets/line.detective.lucien-opening.promoted-1788308718588-8.mp3",
        "prompt": "courteous, incisive authority",
        "createdAt": "2026-09-02T00:25:58.270Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Dr. Vale, you authenticated the Raven Ledger and examined it tonight. Start with the blackout: where were you, and what did you hear in the dark?",
          "direction": "courteous, incisive authority",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-8",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "detective"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.reveal-container": {
    "id": "line.detective.reveal-container",
    "kind": "voice-line",
    "prompt": "cool, deductive certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Your folio is the only container here you refused to have searched, and its rigid sides could conceal the ledger.",
      "direction": "cool, deductive certainty",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-11",
    "versions": {
      "promoted-1788229690995-11": {
        "name": "promoted-1788229690995-11",
        "file": "/assets/line.detective.reveal-container.promoted-1788229690995-11.mp3",
        "prompt": "cool, deductive certainty",
        "createdAt": "2026-09-01T02:29:13.314Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Your folio is the only container here you refused to have searched, and its rigid sides could conceal the ledger.",
          "direction": "cool, deductive certainty",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-11": {
        "name": "promoted-1788308718588-11",
        "file": "/assets/line.detective.reveal-container.promoted-1788308718588-11.mp3",
        "prompt": "cool, deductive certainty",
        "createdAt": "2026-09-02T00:26:11.915Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Your folio is the only container here you refused to have searched, and its rigid sides could conceal the ledger.",
          "direction": "cool, deductive certainty",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-11",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal",
      "conditional"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.reveal-folio": {
    "id": "line.detective.reveal-folio",
    "kind": "voice-line",
    "prompt": "sharp, triumphant certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "Ada heard the display glass rise, then your folio clasp snap shut. She heard the exact moment you hid the ledger.",
      "direction": "sharp, triumphant certainty",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-10",
    "versions": {
      "promoted-1788229690995-10": {
        "name": "promoted-1788229690995-10",
        "file": "/assets/line.detective.reveal-folio.promoted-1788229690995-10.mp3",
        "prompt": "sharp, triumphant certainty",
        "createdAt": "2026-09-01T02:29:08.756Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Ada heard the display glass rise, then your folio clasp snap shut. She heard the exact moment you hid the ledger.",
          "direction": "sharp, triumphant certainty",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-10": {
        "name": "promoted-1788308718588-10",
        "file": "/assets/line.detective.reveal-folio.promoted-1788308718588-10.mp3",
        "prompt": "sharp, triumphant certainty",
        "createdAt": "2026-09-02T00:26:08.807Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "Ada heard the display glass rise, then your folio clasp snap shut. She heard the exact moment you hid the ledger.",
          "direction": "sharp, triumphant certainty",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-10",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal",
      "conditional"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.detective.reveal": {
    "id": "line.detective.reveal",
    "kind": "voice-line",
    "prompt": "relentless, step-by-step accusation",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.detective",
      "text": "You lied about the clock to place Bram by the case. Your copper marker shorted your lamp and this room alone. You used Ada's wax to copy the lock's ward pattern; from that impression you cut the duplicate key, opened the case in the dark, and hid the ledger in your folio.",
      "direction": "relentless, step-by-step accusation",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "activeVersion": "promoted-1788308718588-9",
    "versions": {
      "promoted-1788229690995-9": {
        "name": "promoted-1788229690995-9",
        "file": "/assets/line.detective.reveal.promoted-1788229690995-9.mp3",
        "prompt": "relentless, step-by-step accusation",
        "createdAt": "2026-09-01T02:29:04.147Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "You lied about the clock to place Bram by the case. Your copper marker shorted your lamp and this room alone. You used Ada's wax to copy the lock's ward pattern; from that impression you cut the duplicate key, opened the case in the dark, and hid the ledger in your folio.",
          "direction": "relentless, step-by-step accusation",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308718588-9": {
        "name": "promoted-1788308718588-9",
        "file": "/assets/line.detective.reveal.promoted-1788308718588-9.mp3",
        "prompt": "relentless, step-by-step accusation",
        "createdAt": "2026-09-02T00:26:05.889Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.detective",
          "text": "You lied about the clock to place Bram by the case. Your copper marker shorted your lamp and this room alone. You used Ada's wax to copy the lock's ward pattern; from that impression you cut the duplicate key, opened the case in the dark, and hid the ledger in your folio.",
          "direction": "relentless, step-by-step accusation",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "parentVersion": "promoted-1788229690995-9",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.blame-ada": {
    "id": "line.lucien.blame-ada",
    "kind": "voice-line",
    "prompt": "silky, opportunistic insinuation",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Ada's quarrel was audible from the hall, Detective. Her creditors have not vanished, and sentiment does not settle an overdue conservatory account.",
      "direction": "silky, opportunistic insinuation",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-6",
    "versions": {
      "promoted-1788230047219-6": {
        "name": "promoted-1788230047219-6",
        "file": "/assets/line.lucien.blame-ada.promoted-1788230047219-6.mp3",
        "prompt": "silky, opportunistic insinuation",
        "createdAt": "2026-09-01T02:34:36.666Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Ada's quarrel was audible from the hall, Detective. Her creditors have not vanished, and sentiment does not settle an overdue conservatory account.",
          "direction": "silky, opportunistic insinuation",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-6": {
        "name": "promoted-1788308871354-6",
        "file": "/assets/line.lucien.blame-ada.promoted-1788308871354-6.mp3",
        "prompt": "silky, opportunistic insinuation",
        "createdAt": "2026-09-02T00:28:20.272Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Ada's quarrel was audible from the hall, Detective. Her creditors have not vanished, and sentiment does not settle an overdue conservatory account.",
          "direction": "silky, opportunistic insinuation",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-6",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "deflection"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.blame-bram": {
    "id": "line.lucien.blame-bram",
    "kind": "voice-line",
    "prompt": "cool, insinuating contempt",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Holt was dismissed this afternoon, yet stayed with access to a disconnected alarm and the display it protected.",
      "direction": "cool, insinuating contempt",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-7",
    "versions": {
      "promoted-1788230047219-7": {
        "name": "promoted-1788230047219-7",
        "file": "/assets/line.lucien.blame-bram.promoted-1788230047219-7.mp3",
        "prompt": "cool, insinuating contempt",
        "createdAt": "2026-09-01T02:34:40.471Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Holt was dismissed this afternoon, yet stayed with access to a disconnected alarm and the display it protected.",
          "direction": "cool, insinuating contempt",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-7": {
        "name": "promoted-1788308871354-7",
        "file": "/assets/line.lucien.blame-bram.promoted-1788308871354-7.mp3",
        "prompt": "cool, insinuating contempt",
        "createdAt": "2026-09-02T00:28:24.687Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Holt was dismissed this afternoon, yet stayed with access to a disconnected alarm and the display it protected.",
          "direction": "cool, insinuating contempt",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-7",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "deflection"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.case-dispute": {
    "id": "line.lucien.case-dispute",
    "kind": "voice-line",
    "prompt": "controlled, defensive authority",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "I dispute both the date and the conclusion, Detective. A single anomalous watermark is not enough to prove that the entire Raven Ledger is a forgery.",
      "direction": "controlled, defensive authority",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-2",
    "versions": {
      "promoted-1788230047219-2": {
        "name": "promoted-1788230047219-2",
        "file": "/assets/line.lucien.case-dispute.promoted-1788230047219-2.mp3",
        "prompt": "controlled, defensive authority",
        "createdAt": "2026-09-01T02:34:17.928Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "I dispute both the date and the conclusion, Detective. A single anomalous watermark is not enough to prove that the entire Raven Ledger is a forgery.",
          "direction": "controlled, defensive authority",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-2": {
        "name": "promoted-1788308871354-2",
        "file": "/assets/line.lucien.case-dispute.promoted-1788308871354-2.mp3",
        "prompt": "controlled, defensive authority",
        "createdAt": "2026-09-02T00:27:59.035Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "I dispute both the date and the conclusion, Detective. A single anomalous watermark is not enough to prove that the entire Raven Ledger is a forgery.",
          "direction": "controlled, defensive authority",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-2",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "intro",
      "motive"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.case-presence": {
    "id": "line.lucien.case-presence",
    "kind": "voice-line",
    "prompt": "formal, self-important composure",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Dr. Lucien Vale. I authenticated the Raven Ledger twenty years ago. Edwin invited me to examine it before he presented his new findings.",
      "direction": "formal, self-important composure",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-1",
    "versions": {
      "promoted-1788230047219-1": {
        "name": "promoted-1788230047219-1",
        "file": "/assets/line.lucien.case-presence.promoted-1788230047219-1.mp3",
        "prompt": "formal, self-important composure",
        "createdAt": "2026-09-01T02:34:12.778Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Dr. Lucien Vale. I authenticated the Raven Ledger twenty years ago. Edwin invited me to examine it before he presented his new findings.",
          "direction": "formal, self-important composure",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-1": {
        "name": "promoted-1788308871354-1",
        "file": "/assets/line.lucien.case-presence.promoted-1788308871354-1.mp3",
        "prompt": "formal, self-important composure",
        "createdAt": "2026-09-02T00:27:55.302Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Dr. Lucien Vale. I authenticated the Raven Ledger twenty years ago. Edwin invited me to examine it before he presented his new findings.",
          "direction": "formal, self-important composure",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-1",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "intro"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.clock": {
    "id": "line.lucien.clock",
    "kind": "voice-line",
    "prompt": "flustered, hastily improvising",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Then I heard another clock, perhaps the carriage clock in the hall. The house has several timepieces, Detective; I could easily have mistaken one for another.",
      "direction": "flustered, hastily improvising",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-8",
    "versions": {
      "promoted-1788230047219-8": {
        "name": "promoted-1788230047219-8",
        "file": "/assets/line.lucien.clock.promoted-1788230047219-8.mp3",
        "prompt": "flustered, hastily improvising",
        "createdAt": "2026-09-01T02:34:43.906Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Then I heard another clock, perhaps the carriage clock in the hall. The house has several timepieces, Detective; I could easily have mistaken one for another.",
          "direction": "flustered, hastily improvising",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-8": {
        "name": "promoted-1788308871354-8",
        "file": "/assets/line.lucien.clock.promoted-1788308871354-8.mp3",
        "prompt": "flustered, hastily improvising",
        "createdAt": "2026-09-02T00:28:29.256Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Then I heard another clock, perhaps the carriage clock in the hall. The house has several timepieces, Detective; I could easily have mistaken one for another.",
          "direction": "flustered, hastily improvising",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-8",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.confession": {
    "id": "line.lucien.confession",
    "kind": "voice-line",
    "prompt": "shattered, bitter vulnerability",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "That watermark would have destroyed everything I built: my reputation, my scholarship, and every conclusion the academic world accepted on my authority.",
      "direction": "shattered, bitter vulnerability",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-15",
    "versions": {
      "promoted-1788230047219-15": {
        "name": "promoted-1788230047219-15",
        "file": "/assets/line.lucien.confession.promoted-1788230047219-15.mp3",
        "prompt": "shattered, bitter vulnerability",
        "createdAt": "2026-09-01T02:35:19.903Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "That watermark would have destroyed everything I built: my reputation, my scholarship, and every conclusion the academic world accepted on my authority.",
          "direction": "shattered, bitter vulnerability",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-15": {
        "name": "promoted-1788308871354-15",
        "file": "/assets/line.lucien.confession.promoted-1788308871354-15.mp3",
        "prompt": "shattered, bitter vulnerability",
        "createdAt": "2026-09-02T00:28:58.948Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "That watermark would have destroyed everything I built: my reputation, my scholarship, and every conclusion the academic world accepted on my authority.",
          "direction": "shattered, bitter vulnerability",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-15",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "reveal"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.early": {
    "id": "line.lucien.early",
    "kind": "voice-line",
    "prompt": "scornful, theatrical dismissal",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "You have suspicions and contradictions, Detective, but not a case. Bring me evidence that explains the clock, the darkness, and the missing ledger—or spare us the theatre.",
      "direction": "scornful, theatrical dismissal",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-13",
    "versions": {
      "promoted-1788230047219-13": {
        "name": "promoted-1788230047219-13",
        "file": "/assets/line.lucien.early.promoted-1788230047219-13.mp3",
        "prompt": "scornful, theatrical dismissal",
        "createdAt": "2026-09-01T02:35:10.013Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "You have suspicions and contradictions, Detective, but not a case. Bring me evidence that explains the clock, the darkness, and the missing ledger—or spare us the theatre.",
          "direction": "scornful, theatrical dismissal",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-13": {
        "name": "promoted-1788308871354-13",
        "file": "/assets/line.lucien.early.promoted-1788308871354-13.mp3",
        "prompt": "scornful, theatrical dismissal",
        "createdAt": "2026-09-02T00:28:51.743Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "You have suspicions and contradictions, Detective, but not a case. Bring me evidence that explains the clock, the darkness, and the missing ledger—or spare us the theatre.",
          "direction": "scornful, theatrical dismissal",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-13",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "accusation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.folio": {
    "id": "line.lucien.folio",
    "kind": "voice-line",
    "prompt": "cutting, contemptuous dismissal",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Miss Mercer hears exactly what assists her and forgets exactly what does not. A clasp closing in darkness could have belonged to anyone in this room.",
      "direction": "cutting, contemptuous dismissal",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-12",
    "versions": {
      "promoted-1788230047219-12": {
        "name": "promoted-1788230047219-12",
        "file": "/assets/line.lucien.folio.promoted-1788230047219-12.mp3",
        "prompt": "cutting, contemptuous dismissal",
        "createdAt": "2026-09-01T02:35:03.402Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Miss Mercer hears exactly what assists her and forgets exactly what does not. A clasp closing in darkness could have belonged to anyone in this room.",
          "direction": "cutting, contemptuous dismissal",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-12": {
        "name": "promoted-1788308871354-12",
        "file": "/assets/line.lucien.folio.promoted-1788308871354-12.mp3",
        "prompt": "cutting, contemptuous dismissal",
        "createdAt": "2026-09-02T00:28:46.192Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Miss Mercer hears exactly what assists her and forgets exactly what does not. A clasp closing in darkness could have belonged to anyone in this room.",
          "direction": "cutting, contemptuous dismissal",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-12",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.intro": {
    "id": "line.lucien.intro",
    "kind": "voice-line",
    "prompt": "urbane, subtly accusatory",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Of course. Holt had access to the alarm, and Miss Mercer has creditors. One should begin with the simple facts.",
      "direction": "urbane, subtly accusatory",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-3",
    "versions": {
      "promoted-1788230047219-3": {
        "name": "promoted-1788230047219-3",
        "file": "/assets/line.lucien.intro.promoted-1788230047219-3.mp3",
        "prompt": "urbane, subtly accusatory",
        "createdAt": "2026-09-01T02:34:23.494Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Of course. Holt had access to the alarm, and Miss Mercer has creditors. One should begin with the simple facts.",
          "direction": "urbane, subtly accusatory",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-3": {
        "name": "promoted-1788308871354-3",
        "file": "/assets/line.lucien.intro.promoted-1788308871354-3.mp3",
        "prompt": "urbane, subtly accusatory",
        "createdAt": "2026-09-02T00:28:03.882Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Of course. Holt had access to the alarm, and Miss Mercer has creditors. One should begin with the simple facts.",
          "direction": "urbane, subtly accusatory",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-3",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.lamp": {
    "id": "line.lucien.lamp",
    "kind": "voice-line",
    "prompt": "dismissive, aggrieved deflection",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Anyone could have planted the copper marker. Its location proves only that someone wished to implicate me.",
      "direction": "dismissive, aggrieved deflection",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-9",
    "versions": {
      "promoted-1788230047219-9": {
        "name": "promoted-1788230047219-9",
        "file": "/assets/line.lucien.lamp.promoted-1788230047219-9.mp3",
        "prompt": "dismissive, aggrieved deflection",
        "createdAt": "2026-09-01T02:34:48.291Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Anyone could have planted the copper marker. Its location proves only that someone wished to implicate me.",
          "direction": "dismissive, aggrieved deflection",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-9": {
        "name": "promoted-1788308871354-9",
        "file": "/assets/line.lucien.lamp.promoted-1788308871354-9.mp3",
        "prompt": "dismissive, aggrieved deflection",
        "createdAt": "2026-09-02T00:28:31.850Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Anyone could have planted the copper marker. Its location proves only that someone wished to implicate me.",
          "direction": "dismissive, aggrieved deflection",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-9",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.motive": {
    "id": "line.lucien.motive",
    "kind": "voice-line",
    "prompt": "defensive, emphatic denial",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "An 1846 watermark would challenge the ledger's date, not prove I knowingly authenticated a forgery. Edwin had a theory, not proof.",
      "direction": "defensive, emphatic denial",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-11",
    "versions": {
      "promoted-1788230047219-11": {
        "name": "promoted-1788230047219-11",
        "file": "/assets/line.lucien.motive.promoted-1788230047219-11.mp3",
        "prompt": "defensive, emphatic denial",
        "createdAt": "2026-09-01T02:34:58.741Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "An 1846 watermark would challenge the ledger's date, not prove I knowingly authenticated a forgery. Edwin had a theory, not proof.",
          "direction": "defensive, emphatic denial",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-11": {
        "name": "promoted-1788308871354-11",
        "file": "/assets/line.lucien.motive.promoted-1788308871354-11.mp3",
        "prompt": "defensive, emphatic denial",
        "createdAt": "2026-09-02T00:28:40.974Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "An 1846 watermark would challenge the ledger's date, not prove I knowingly authenticated a forgery. Edwin had a theory, not proof.",
          "direction": "defensive, emphatic denial",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-11",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.refuse": {
    "id": "line.lucien.refuse",
    "kind": "voice-line",
    "prompt": "icy, indignant refusal",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "My folio contains private correspondence from colleagues and clients. Your theory gives you neither cause nor authority to search through those papers.",
      "direction": "icy, indignant refusal",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-14",
    "versions": {
      "promoted-1788230047219-14": {
        "name": "promoted-1788230047219-14",
        "file": "/assets/line.lucien.refuse.promoted-1788230047219-14.mp3",
        "prompt": "icy, indignant refusal",
        "createdAt": "2026-09-01T02:35:15.182Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "My folio contains private correspondence from colleagues and clients. Your theory gives you neither cause nor authority to search through those papers.",
          "direction": "icy, indignant refusal",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-14": {
        "name": "promoted-1788308871354-14",
        "file": "/assets/line.lucien.refuse.promoted-1788308871354-14.mp3",
        "prompt": "icy, indignant refusal",
        "createdAt": "2026-09-02T00:28:55.382Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "My folio contains private correspondence from colleagues and clients. Your theory gives you neither cause nor authority to search through those papers.",
          "direction": "icy, indignant refusal",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-14",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "reveal"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.timeline": {
    "id": "line.lucien.timeline",
    "kind": "voice-line",
    "prompt": "smooth, rehearsed certainty",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "The mantel clock struck nine. On the first chime, darkness; on the second, Holt's tool case clicked beside the display.",
      "direction": "smooth, rehearsed certainty",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-4",
    "versions": {
      "promoted-1788230047219-4": {
        "name": "promoted-1788230047219-4",
        "file": "/assets/line.lucien.timeline.promoted-1788230047219-4.mp3",
        "prompt": "smooth, rehearsed certainty",
        "createdAt": "2026-09-01T02:34:27.935Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "The mantel clock struck nine. On the first chime, darkness; on the second, Holt's tool case clicked beside the display.",
          "direction": "smooth, rehearsed certainty",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-4": {
        "name": "promoted-1788308871354-4",
        "file": "/assets/line.lucien.timeline.promoted-1788308871354-4.mp3",
        "prompt": "smooth, rehearsed certainty",
        "createdAt": "2026-09-02T00:28:07.335Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "The mantel clock struck nine. On the first chime, darkness; on the second, Holt's tool case clicked beside the display.",
          "direction": "smooth, rehearsed certainty",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-4",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "lie"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.watermark": {
    "id": "line.lucien.watermark",
    "kind": "voice-line",
    "prompt": "strained, scholarly condescension",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "An 1846 mark would contradict an 1812 date—if Edwin has read it correctly. One anomaly does not erase twenty years of scholarship.",
      "direction": "strained, scholarly condescension",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-5",
    "versions": {
      "promoted-1788230047219-5": {
        "name": "promoted-1788230047219-5",
        "file": "/assets/line.lucien.watermark.promoted-1788230047219-5.mp3",
        "prompt": "strained, scholarly condescension",
        "createdAt": "2026-09-01T02:34:33.337Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "An 1846 mark would contradict an 1812 date—if Edwin has read it correctly. One anomaly does not erase twenty years of scholarship.",
          "direction": "strained, scholarly condescension",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-5": {
        "name": "promoted-1788308871354-5",
        "file": "/assets/line.lucien.watermark.promoted-1788308871354-5.mp3",
        "prompt": "strained, scholarly condescension",
        "createdAt": "2026-09-02T00:28:11.613Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "An 1846 mark would contradict an 1812 date—if Edwin has read it correctly. One anomaly does not erase twenty years of scholarship.",
          "direction": "strained, scholarly condescension",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-5",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "lie"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "line.lucien.wax": {
    "id": "line.lucien.wax",
    "kind": "voice-line",
    "prompt": "urgent, accusatory deflection",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "voiceAssetId": "voice.lucien",
      "text": "Then Holt must have used her wax to copy the lock's pattern. He understands mechanisms, worked beside the display, and surely even you can see how neatly it fits him.",
      "direction": "urgent, accusatory deflection",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "activeVersion": "promoted-1788308871354-10",
    "versions": {
      "promoted-1788230047219-10": {
        "name": "promoted-1788230047219-10",
        "file": "/assets/line.lucien.wax.promoted-1788230047219-10.mp3",
        "prompt": "urgent, accusatory deflection",
        "createdAt": "2026-09-01T02:34:52.941Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Then Holt must have used her wax to copy the lock's pattern. He understands mechanisms, worked beside the display, and surely even you can see how neatly it fits him.",
          "direction": "urgent, accusatory deflection",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      },
      "promoted-1788308871354-10": {
        "name": "promoted-1788308871354-10",
        "file": "/assets/line.lucien.wax.promoted-1788308871354-10.mp3",
        "prompt": "urgent, accusatory deflection",
        "createdAt": "2026-09-02T00:28:36.614Z",
        "model": "eleven_v3",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "voiceAssetId": "voice.lucien",
          "text": "Then Holt must have used her wax to copy the lock's pattern. He understands mechanisms, worked beside the display, and surely even you can see how neatly it fits him.",
          "direction": "urgent, accusatory deflection",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "parentVersion": "promoted-1788230047219-10",
        "notes": "Regenerated from the selected base voice with Regenerate all lines."
      }
    },
    "tags": [
      "dialog",
      "lucien",
      "confrontation"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "voice.ada": {
    "id": "voice.ada",
    "kind": "voice",
    "prompt": "Intelligent British woman in her late twenties, musical controlled delivery with a brittle edge, proud, emotionally precise.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false,
      "durationSeconds": 2
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "You hear debt and imagine guilt. I hear a room full of frightened people, each trimming the truth to protect whatever they value most.",
      "generatedVoiceId": "tq6lmavYCYn0B8TkIgyi",
      "voiceId": "tq6lmavYCYn0B8TkIgyi"
    },
    "linkedAnimationAssets": {
      "case-presence": {
        "label": "Case briefing · Ada",
        "assetId": "line.ada.case-presence"
      },
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
    "activeVersion": "promoted-1788225022778",
    "versions": {
      "promoted-1788225022778": {
        "name": "promoted-1788225022778",
        "file": "/assets/voice.ada.promoted-1788225022778.mp3",
        "prompt": "Intelligent British woman in her late twenties, musical controlled delivery with a brittle edge, proud, emotionally precise.",
        "createdAt": "2026-09-01T01:10:24.215Z",
        "model": "eleven_multilingual_ttv_v2",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false,
          "durationSeconds": 2
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "previewText": "You hear debt and imagine guilt. I hear a room full of frightened people, each trimming the truth to protect whatever they value most.",
          "generatedVoiceId": "tq6lmavYCYn0B8TkIgyi",
          "voiceId": "tq6lmavYCYn0B8TkIgyi"
        },
        "durationSeconds": 9.563625,
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "voice",
      "suspect",
      "ada"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "voice.bram": {
    "id": "voice.bram",
    "kind": "voice",
    "prompt": "Weathered British working man in his late forties, rough baritone, blunt and defensive but fundamentally steady and honest.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false,
      "durationSeconds": 2
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "Wires tell the truth. People generally need a little more testing, especially when darkness gives them the chance to hide what they have done.",
      "generatedVoiceId": "TBvzzADcRcbhbWVJ8QRL",
      "voiceId": "TBvzzADcRcbhbWVJ8QRL"
    },
    "linkedAnimationAssets": {
      "case-presence": {
        "label": "Case briefing · Bram",
        "assetId": "line.bram.case-presence"
      },
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
    "activeVersion": "promoted-1788225060720",
    "versions": {
      "promoted-1788225060720": {
        "name": "promoted-1788225060720",
        "file": "/assets/voice.bram.promoted-1788225060720.mp3",
        "prompt": "Weathered British working man in his late forties, rough baritone, blunt and defensive but fundamentally steady and honest.",
        "createdAt": "2026-09-01T01:11:02.141Z",
        "model": "eleven_multilingual_ttv_v2",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false,
          "durationSeconds": 2
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "previewText": "Wires tell the truth. People generally need a little more testing, especially when darkness gives them the chance to hide what they have done.",
          "generatedVoiceId": "TBvzzADcRcbhbWVJ8QRL",
          "voiceId": "TBvzzADcRcbhbWVJ8QRL"
        },
        "durationSeconds": 8.5448125,
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "voice",
      "suspect",
      "bram"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "voice.detective": {
    "id": "voice.detective",
    "kind": "voice",
    "prompt": "Measured private detective, low and observant, concise authority, thoughtful rather than theatrical, 1930s mystery cadence.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false,
      "durationSeconds": 2
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "A lie is only a borrowed alibi. Eventually, its owner asks for it back, and by then the smallest contradiction can bring the whole story down.",
      "generatedVoiceId": "be3zS5FjdFJ6Tw02SmY8",
      "voiceId": "be3zS5FjdFJ6Tw02SmY8"
    },
    "linkedAnimationAssets": {
      "case-victim": {
        "label": "Case briefing · victim",
        "assetId": "line.detective.case-victim"
      },
      "case-locked-room": {
        "label": "Case briefing · locked room",
        "assetId": "line.detective.case-locked-room"
      },
      "case-blackout": {
        "label": "Case briefing · blackout",
        "assetId": "line.detective.case-blackout"
      },
      "case-watermark": {
        "label": "Case briefing · watermark",
        "assetId": "line.detective.case-watermark"
      },
      "case-questioning": {
        "label": "Case briefing · questions",
        "assetId": "line.detective.case-questioning"
      },
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
    "activeVersion": "promoted-1788224979435",
    "versions": {
      "promoted-1788224979435": {
        "name": "promoted-1788224979435",
        "file": "/assets/voice.detective.promoted-1788224979435.mp3",
        "prompt": "Measured private detective, low and observant, concise authority, thoughtful rather than theatrical, 1930s mystery cadence.",
        "createdAt": "2026-09-01T01:09:41.280Z",
        "model": "eleven_multilingual_ttv_v2",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false,
          "durationSeconds": 2
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "previewText": "A lie is only a borrowed alibi. Eventually, its owner asks for it back, and by then the smallest contradiction can bring the whole story down.",
          "generatedVoiceId": "be3zS5FjdFJ6Tw02SmY8",
          "voiceId": "be3zS5FjdFJ6Tw02SmY8"
        },
        "durationSeconds": 10.45175,
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "voice",
      "detective"
    ],
    "settings": {},
    "audioPlayback": {}
  },
  "voice.lucien": {
    "id": "voice.lucien",
    "kind": "voice",
    "prompt": "Cultivated silver-haired British historian, smooth resonant voice, impeccable diction and paternal charm hiding a vein of panic.",
    "audioSettings": {
      "provider": "elevenlabs",
      "format": "mp3",
      "loop": false,
      "durationSeconds": 2
    },
    "voiceSettings": {
      "provider": "elevenlabs",
      "previewText": "History is not what happened, Detective. It is what survives examination, repetition, and the judgment of whoever holds the evidence.",
      "generatedVoiceId": "y8vZkYfEq4BEWRqNMIBq",
      "voiceId": "y8vZkYfEq4BEWRqNMIBq"
    },
    "linkedAnimationAssets": {
      "case-presence": {
        "label": "Case briefing · Lucien",
        "assetId": "line.lucien.case-presence"
      },
      "case-dispute": {
        "label": "Case briefing · dispute",
        "assetId": "line.lucien.case-dispute"
      },
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
    "activeVersion": "promoted-1788225087745",
    "versions": {
      "promoted-1788225087745": {
        "name": "promoted-1788225087745",
        "file": "/assets/voice.lucien.promoted-1788225087745.mp3",
        "prompt": "Cultivated silver-haired British historian, smooth resonant voice, impeccable diction and paternal charm hiding a vein of panic.",
        "createdAt": "2026-09-01T01:11:30.246Z",
        "model": "eleven_multilingual_ttv_v2",
        "settings": {},
        "audioSettings": {
          "provider": "elevenlabs",
          "format": "mp3",
          "loop": false,
          "durationSeconds": 2
        },
        "audioPlayback": {},
        "voiceSettings": {
          "provider": "elevenlabs",
          "previewText": "History is not what happened, Detective. It is what survives examination, repetition, and the judgment of whoever holds the evidence.",
          "generatedVoiceId": "y8vZkYfEq4BEWRqNMIBq",
          "voiceId": "y8vZkYfEq4BEWRqNMIBq"
        },
        "durationSeconds": 9.041125,
        "notes": "Promoted from the AI asset designer."
      }
    },
    "tags": [
      "voice",
      "suspect",
      "lucien"
    ],
    "settings": {},
    "audioPlayback": {}
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
  "character.ada.idle": [
    "Graphics",
    "Characters"
  ],
  "character.ada": [
    "Graphics",
    "Characters"
  ],
  "character.ada.speaking": [
    "Graphics",
    "Characters"
  ],
  "character.bram.idle": [
    "Graphics",
    "Characters"
  ],
  "character.bram": [
    "Graphics",
    "Characters"
  ],
  "character.bram.speaking": [
    "Graphics",
    "Characters"
  ],
  "character.lucien.idle": [
    "Graphics",
    "Characters"
  ],
  "character.lucien": [
    "Graphics",
    "Characters"
  ],
  "character.lucien.speaking": [
    "Graphics",
    "Characters"
  ],
  "audio.music.noir": [
    "Music"
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
  "line.ada.case-presence": [
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
  "line.bram.case-presence": [
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
  "line.detective.case-blackout": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.case-locked-room": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.case-questioning": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.case-victim": [
    "Voices",
    "Lines",
    "Detective"
  ],
  "line.detective.case-watermark": [
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
  "line.lucien.case-dispute": [
    "Voices",
    "Lines",
    "Lucien"
  ],
  "line.lucien.case-presence": [
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
