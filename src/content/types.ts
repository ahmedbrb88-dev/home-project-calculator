export interface SiteContent {
  "nav": {
    "home": string;
    "calculators": string;
    "projects": string;
    "howItWorks": string;
    "preferences": string;
    "mega": {
      "viewAll": string;
      "concrete": {
        "title": string;
        "desc": string;
      }
      "paint": {
        "title": string;
        "desc": string;
      }
      "tile": {
        "title": string;
        "desc": string;
      }
      "gravel": {
        "title": string;
        "desc": string;
      }
      "area": {
        "title": string;
        "desc": string;
      }
    }
  }
  "prefs": {
    "title": string;
    "language": string;
    "country": string;
    "currency": string;
    "units": string;
    "metric": string;
    "imperial": string;
  }
  "hero": {
    "title": string;
    "subtitle": string;
    "primaryCta": string;
    "secondaryCta": string;
    "eyebrow": string;
  }
  "search": {
    "title": string;
    "subtitle": string;
    "placeholder": string;
    "noResults": string;
    "button": string;
  }
  "categories": {
    "title": string;
  }
  "materials": {
    "title": string;
    "comingSoon": string;
    "concrete": {
      "name": string;
    }
    "paint": {
      "name": string;
    }
    "tile": {
      "name": string;
    }
    "gravel": {
      "name": string;
    }
    "flooring": {
      "name": string;
    }
    "soil": {
      "name": string;
    }
    "mulch": {
      "name": string;
    }
    "pavers": {
      "name": string;
    }
    "drywall": {
      "name": string;
    }
    "roofing": {
      "name": string;
    }
    "brick": {
      "name": string;
    }
    "wood": {
      "name": string;
    }
    "eyebrow": string;
    "heading": string;
    "subheading": string;
  }
  "projects": {
    "title": string;
    "subtitle": string;
    "patio": {
      "title": string;
      "desc": string;
    }
    "bathroom": {
      "title": string;
      "desc": string;
    }
    "kitchen": {
      "title": string;
      "desc": string;
    }
    "garden": {
      "title": string;
      "desc": string;
    }
    "driveway": {
      "title": string;
      "desc": string;
    }
    "bedroom": {
      "title": string;
      "desc": string;
    }
    "step": {
      "measureArea": string;
      "estimateGravel": string;
      "calcConcrete": string;
      "measureFloor": string;
      "calcWallFloorTiles": string;
      "estimateCeilingPaint": string;
      "calcFloorTiles": string;
      "estimateWallPaint": string;
      "measureBeds": string;
      "calcDecoGravel": string;
      "calcConcreteSimple": string;
      "measureRoom": string;
    }
  }
  "footer": {
    "tools": string;
    "company": string;
    "legal": string;
    "about": string;
    "contact": string;
    "privacy": string;
    "terms": string;
    "disclaimer": string;
  }
  "btn": {
    "start": string;
    "copy": string;
    "backToTop": string;
    "calculate": string;
  }
  "error": {
    "required": string;
    "greaterThanZero": string;
  }
  "calc": {
    "yourEstimate": string;
    "materialCost": string;
    "whatNext": string;
    "youMayAlsoNeed": string;
    "pricePer": string;
    "optional": string;
    "waste": string;
    "inputs": {
      "length": string;
      "width": string;
      "depth": string;
      "height": string;
      "doors": string;
      "windows": string;
      "coats": string;
      "coverage": string;
    }
    "concrete": {
      "title": string;
      "description": string;
      "howItWorks": string;
      "formula": string;
      "example": string;
      "tips": string;
      "disclaimer": string;
      "faq": {
        "1": {
          "q": string;
          "a": string;
        }
      }
    }
    "paint": {
      "title": string;
      "description": string;
      "howItWorks": string;
      "formula": string;
      "example": string;
      "tips": string;
      "howItWorksDesc": string;
      "exampleDesc": string;
      "ex1": string;
      "ex2": string;
      "ex3": string;
      "ex4": string;
      "tipsDesc": string;
      "disclaimer": string;
      "gallons": string;
      "liters": string;
    }
    "tile": {
      "title": string;
      "description": string;
      "estimateReady": string;
      "yourEstimate": string;
      "tiles": string;
      "orBoxes": string;
      "estimatedCost": string;
      "howItWorks": string;
      "howItWorksDesc": string;
      "formula": string;
      "example": string;
      "exampleDesc": string;
      "ex1": string;
      "ex2": string;
      "ex3": string;
      "ex4": string;
      "whyWaste": string;
      "whyWasteDesc": string;
    }
    "gravel": {
      "title": string;
      "description": string;
      "howItWorks": string;
      "formula": string;
      "example": string;
      "tips": string;
      "disclaimer": string;
      "howItWorksDesc": string;
      "exampleDesc": string;
      "ex1": string;
      "ex2": string;
      "tipsDesc": string;
      "density": string;
    }
    "area": {
      "title": string;
      "description": string;
      "howItWorks": string;
      "formula": string;
      "example": string;
      "tips": string;
      "howItWorksDesc": string;
      "exampleDesc": string;
      "ex1": string;
      "tipsDesc": string;
      "disclaimer": string;
    }
    "paver": string;
    "grout": string;
    "drywall": string;
    "backsplash": string;
    "cabinet": string;
    "soil": string;
    "mulch": string;
    "fence": string;
    "asphalt": string;
    "hardwood": string;
    "carpet": string;
    "step1": string;
    "step2": string;
    "step3": string;
    "estimateReady": string;
    "tilesPerBox": string;
    "pricePerBox": string;
  }
  "copy": {
    "concrete": {
      "base": string;
      "waste": string;
    }
    "cost": string;
    "gravel": {
      "base": string;
    }
    "paint": {
      "base": string;
    }
    "area": {
      "base": string;
    }
  }
  "common": {
    "comingSoon": string;
    "recommendedTools": string;
    "projectNotFound": string;
  }
  "static": {
    "about": {
      "title": string;
      "p1": string;
      "p2": string;
      "features": string;
      "f1": string;
      "f2": string;
      "f3": string;
      "f4": string;
      "f5": string;
      "disclaimer": string;
    }
    "privacy": {
      "title": string;
      "updated": string;
      "p1": string;
      "dataTitle": string;
      "dataDesc": string;
      "localTitle": string;
      "localDesc": string;
      "analyticsTitle": string;
      "analyticsDesc": string;
    }
    "terms": {
      "title": string;
      "p1": string;
      "useTitle": string;
      "useDesc": string;
      "estimatesTitle": string;
      "estimatesDesc": string;
      "userTitle": string;
      "userDesc": string;
    }
    "disclaimer": {
      "title": string;
      "p1": string;
      "d1": string;
      "d2": string;
      "d3": string;
      "d4": string;
    }
    "contact": {
      "title": string;
      "p1": string;
      "p2": string;
    }
    "hiw": {
      "title": string;
      "p1": string;
      "steps": {
        "1": {
          "t": string;
          "d": string;
        }
        "2": {
          "t": string;
          "d": string;
        }
        "3": {
          "t": string;
          "d": string;
        }
        "4": {
          "t": string;
          "d": string;
        }
      }
    }
  }
  "home": {
    "popular": {
      "eyebrow": string;
      "title": string;
    }
    "categories": {
      "eyebrow": string;
      "title": string;
      "concrete": {
        "desc": string;
      }
      "paint": {
        "desc": string;
      }
      "tile": {
        "desc": string;
      }
      "gravel": {
        "desc": string;
      }
      "exterior": {
        "title": string;
        "desc": string;
      }
      "area": {
        "desc": string;
      }
      "view": string;
    }
    "howItWorks": {
      "eyebrow": string;
      "title": string;
      "step1": string;
      "step2": string;
      "step3": string;
    }
    "projects": {
      "eyebrow": string;
      "title": string;
      "subtitle": string;
      "view": string;
    }
    "cta": {
      "title": string;
      "desc": string;
    }
  }
  "cat": {
    "foundation": string;
    "interior": string;
    "measure": string;
    "flooring": string;
    "landscaping": string;
  }
  "directory": {
    "title": string;
    "subtitle": string;
    "popular": string;
    "all": string;
  }
  "keywords": {
    "concrete": string;
    "paint": string;
    "tile": string;
    "gravel": string;
    "area": string;
  }
}
