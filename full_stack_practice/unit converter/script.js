// Advanced Unit Conversion System with Cross-Category Support
// All units are stored with conversion factors to their base unit

// Sector mapping - categories can appear in multiple sectors
const sectorMapping = {
    all: ["distance", "mass", "volume", "temperature", "time", "area", "speed", "fuel", "energy", "pressure", "data", "angle", "frequency", "force", "electrical", "flowRate", "density", "torque"],
    everyday: ["distance", "mass", "volume", "temperature", "time", "area", "speed", "energy", "frequency"],
    engineering: ["distance", "mass", "volume", "area", "speed", "energy", "pressure", "angle", "force", "torque", "flowRate", "density", "electrical"],
    science: ["distance", "mass", "volume", "temperature", "time", "energy", "pressure", "angle", "frequency", "force", "electrical", "density"],
    automotive: ["distance", "speed", "fuel", "pressure", "volume", "mass", "torque", "force", "energy"],
    culinary: ["mass", "volume", "temperature", "time", "density"],
    digital: ["data", "energy", "time", "frequency", "electrical"],
    health: ["mass", "energy", "time", "distance", "pressure"],
    aviation: ["distance", "speed", "pressure", "fuel", "angle", "force", "density"],
    business: ["time", "data", "energy", "flowRate"]
};

// Complexity level mapping
const complexityMapping = {
    basic: ["distance", "mass", "volume", "temperature", "time", "area", "speed", "fuel", "energy"],
    professional: ["distance", "mass", "volume", "temperature", "time", "area", "speed", "fuel", "energy", "pressure", "data", "frequency", "force"],
    expert: ["distance", "mass", "volume", "temperature", "time", "area", "speed", "fuel", "energy", "pressure", "data", "angle", "frequency", "force", "electrical", "flowRate", "density", "torque"]
};

// User preferences and storage
let userPreferences = {
    favorites: [],
    recent: [],
    popularCategories: {},
    popularConversions: {},
    lastSector: 'all',
    lastComplexity: 'basic'
};

// Search index for fast text search
let searchIndex = [];

// Current page state
let currentPage = 'converter';

const unitSystem = {
    distance: {
        name: "Distance & Length",
        baseUnit: "meter",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial",
            small: "Small Scale",
            large: "Large Scale"
        },
        units: {
            // Metric
            meter: { name: "Meters", factor: 1, subcategory: "metric", symbol: "m" },
            kilometer: { name: "Kilometers", factor: 1000, subcategory: "metric", symbol: "km" },
            centimeter: { name: "Centimeters", factor: 0.01, subcategory: "metric", symbol: "cm" },
            millimeter: { name: "Millimeters", factor: 0.001, subcategory: "small", symbol: "mm" },
            micrometer: { name: "Micrometers", factor: 0.000001, subcategory: "small", symbol: "μm" },
            nanometer: { name: "Nanometers", factor: 0.000000001, subcategory: "small", symbol: "nm" },
            
            // Imperial
            foot: { name: "Feet", factor: 0.3048, subcategory: "imperial", symbol: "ft" },
            inch: { name: "Inches", factor: 0.0254, subcategory: "imperial", symbol: "in" },
            yard: { name: "Yards", factor: 0.9144, subcategory: "imperial", symbol: "yd" },
            mile: { name: "Miles", factor: 1609.344, subcategory: "imperial", symbol: "mi" },
            
            // Nautical & Large
            nauticalMile: { name: "Nautical Miles", factor: 1852, subcategory: "large", symbol: "nmi" },
            lightYear: { name: "Light Years", factor: 9.461e15, subcategory: "large", symbol: "ly" },
            astronomicalUnit: { name: "Astronomical Units", factor: 1.496e11, subcategory: "large", symbol: "AU" }
        }
    },

    mass: {
        name: "Mass & Weight",
        baseUnit: "kilogram",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial",
            small: "Small Scale",
            large: "Large Scale"
        },
        units: {
            // Metric
            kilogram: { name: "Kilograms", factor: 1, subcategory: "metric", symbol: "kg" },
            gram: { name: "Grams", factor: 0.001, subcategory: "metric", symbol: "g" },
            milligram: { name: "Milligrams", factor: 0.000001, subcategory: "small", symbol: "mg" },
            microgram: { name: "Micrograms", factor: 0.000000001, subcategory: "small", symbol: "μg" },
            tonne: { name: "Metric Tons", factor: 1000, subcategory: "large", symbol: "t" },
            
            // Imperial
            pound: { name: "Pounds", factor: 0.453592, subcategory: "imperial", symbol: "lb" },
            ounce: { name: "Ounces", factor: 0.0283495, subcategory: "imperial", symbol: "oz" },
            stone: { name: "Stones", factor: 6.35029, subcategory: "imperial", symbol: "st" },
            
            // Special
            carat: { name: "Carats", factor: 0.0002, subcategory: "small", symbol: "ct" },
            atomicMass: { name: "Atomic Mass Units", factor: 1.66054e-27, subcategory: "small", symbol: "u" }
        }
    },

    volume: {
        name: "Volume & Liquid",
        baseUnit: "liter",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial",
            cooking: "Cooking",
            large: "Large Scale"
        },
        units: {
            // Metric
            liter: { name: "Liters", factor: 1, subcategory: "metric", symbol: "L" },
            milliliter: { name: "Milliliters", factor: 0.001, subcategory: "metric", symbol: "mL" },
            cubicMeter: { name: "Cubic Meters", factor: 1000, subcategory: "large", symbol: "m³" },
            cubicCentimeter: { name: "Cubic Centimeters", factor: 0.001, subcategory: "metric", symbol: "cm³" },
            
            // Imperial Liquid
            gallon: { name: "Gallons (US)", factor: 3.78541, subcategory: "imperial", symbol: "gal" },
            quart: { name: "Quarts (US)", factor: 0.946353, subcategory: "imperial", symbol: "qt" },
            pint: { name: "Pints (US)", factor: 0.473176, subcategory: "imperial", symbol: "pt" },
            fluidOunce: { name: "Fluid Ounces", factor: 0.0295735, subcategory: "imperial", symbol: "fl oz" },
            
            // Imperial UK
            imperialGallon: { name: "Gallons (UK)", factor: 4.54609, subcategory: "imperial", symbol: "gal UK" },
            
            // Cooking
            cup: { name: "Cups", factor: 0.236588, subcategory: "cooking", symbol: "cup" },
            tablespoon: { name: "Tablespoons", factor: 0.0147868, subcategory: "cooking", symbol: "tbsp" },
            teaspoon: { name: "Teaspoons", factor: 0.00492892, subcategory: "cooking", symbol: "tsp" },
            
            // Large
            cubicFoot: { name: "Cubic Feet", factor: 28.3168, subcategory: "large", symbol: "ft³" },
            barrel: { name: "Barrels (Oil)", factor: 158.987, subcategory: "large", symbol: "bbl" }
        }
    },

    temperature: {
        name: "Temperature",
        baseUnit: "celsius",
        subcategories: {
            all: "All Units"
        },
        units: {
            celsius: { name: "Celsius", symbol: "°C" },
            fahrenheit: { name: "Fahrenheit", symbol: "°F" },
            kelvin: { name: "Kelvin", symbol: "K" },
            rankine: { name: "Rankine", symbol: "°R" }
        },
        // Special conversion functions for temperature
        convert: {
            celsiusToFahrenheit: (c) => (c * 9/5) + 32,
            fahrenheitToCelsius: (f) => (f - 32) * 5/9,
            celsiusToKelvin: (c) => c + 273.15,
            kelvinToCelsius: (k) => k - 273.15,
            celsiusToRankine: (c) => (c + 273.15) * 9/5,
            rankineToCelsius: (r) => (r * 5/9) - 273.15
        }
    },

    time: {
        name: "Time",
        baseUnit: "second",
        subcategories: {
            all: "All Units",
            short: "Short Durations",
            medium: "Medium Durations",
            long: "Long Durations"
        },
        units: {
            // Short
            nanosecond: { name: "Nanoseconds", factor: 1e-9, subcategory: "short", symbol: "ns" },
            microsecond: { name: "Microseconds", factor: 1e-6, subcategory: "short", symbol: "μs" },
            millisecond: { name: "Milliseconds", factor: 0.001, subcategory: "short", symbol: "ms" },
            second: { name: "Seconds", factor: 1, subcategory: "short", symbol: "s" },
            
            // Medium
            minute: { name: "Minutes", factor: 60, subcategory: "medium", symbol: "min" },
            hour: { name: "Hours", factor: 3600, subcategory: "medium", symbol: "h" },
            day: { name: "Days", factor: 86400, subcategory: "medium", symbol: "d" },
            week: { name: "Weeks", factor: 604800, subcategory: "medium", symbol: "wk" },
            
            // Long
            month: { name: "Months", factor: 2629746, subcategory: "long", symbol: "mo" },
            year: { name: "Years", factor: 31556952, subcategory: "long", symbol: "yr" },
            decade: { name: "Decades", factor: 315569520, subcategory: "long", symbol: "dec" },
            century: { name: "Centuries", factor: 3155695200, subcategory: "long", symbol: "c" }
        }
    },

    area: {
        name: "Area",
        baseUnit: "squareMeter",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial",
            land: "Land Area"
        },
        units: {
            // Metric
            squareMeter: { name: "Square Meters", factor: 1, subcategory: "metric", symbol: "m²" },
            squareKilometer: { name: "Square Kilometers", factor: 1000000, subcategory: "metric", symbol: "km²" },
            squareCentimeter: { name: "Square Centimeters", factor: 0.0001, subcategory: "metric", symbol: "cm²" },
            hectare: { name: "Hectares", factor: 10000, subcategory: "land", symbol: "ha" },
            
            // Imperial
            squareFoot: { name: "Square Feet", factor: 0.092903, subcategory: "imperial", symbol: "ft²" },
            squareInch: { name: "Square Inches", factor: 0.00064516, subcategory: "imperial", symbol: "in²" },
            squareYard: { name: "Square Yards", factor: 0.836127, subcategory: "imperial", symbol: "yd²" },
            squareMile: { name: "Square Miles", factor: 2589988.11, subcategory: "land", symbol: "mi²" },
            acre: { name: "Acres", factor: 4046.86, subcategory: "land", symbol: "ac" }
        }
    },

    speed: {
        name: "Speed & Velocity",
        baseUnit: "meterPerSecond",
        subcategories: {
            all: "All Units",
            everyday: "Everyday",
            scientific: "Scientific",
            transportation: "Transportation"
        },
        units: {
            meterPerSecond: { name: "Meters per Second", factor: 1, subcategory: "scientific", symbol: "m/s" },
            kilometerPerHour: { name: "Kilometers per Hour", factor: 0.277778, subcategory: "everyday", symbol: "km/h" },
            milePerHour: { name: "Miles per Hour", factor: 0.44704, subcategory: "everyday", symbol: "mph" },
            knot: { name: "Knots", factor: 0.514444, subcategory: "transportation", symbol: "kn" },
            footPerSecond: { name: "Feet per Second", factor: 0.3048, subcategory: "scientific", symbol: "ft/s" },
            mach: { name: "Mach", factor: 343, subcategory: "transportation", symbol: "Ma" },
            speedOfLight: { name: "Speed of Light", factor: 299792458, subcategory: "scientific", symbol: "c" }
        }
    },

    energy: {
        name: "Energy & Power",
        baseUnit: "joule",
        subcategories: {
            all: "All Units",
            energy: "Energy",
            power: "Power",
            electrical: "Electrical"
        },
        units: {
            // Energy
            joule: { name: "Joules", factor: 1, subcategory: "energy", symbol: "J" },
            kilojoule: { name: "Kilojoules", factor: 1000, subcategory: "energy", symbol: "kJ" },
            calorie: { name: "Calories", factor: 4.184, subcategory: "energy", symbol: "cal" },
            kilocalorie: { name: "Kilocalories", factor: 4184, subcategory: "energy", symbol: "kcal" },
            btu: { name: "BTU", factor: 1055.06, subcategory: "energy", symbol: "BTU" },
            kilowattHour: { name: "Kilowatt-hours", factor: 3600000, subcategory: "electrical", symbol: "kWh" },
            
            // Power (treated as energy per second for conversion purposes)
            watt: { name: "Watts", factor: 1, subcategory: "power", symbol: "W", type: "power" },
            kilowatt: { name: "Kilowatts", factor: 1000, subcategory: "power", symbol: "kW", type: "power" },
            horsepower: { name: "Horsepower", factor: 745.7, subcategory: "power", symbol: "hp", type: "power" }
        }
    },

    pressure: {
        name: "Pressure",
        baseUnit: "pascal",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial",
            atmospheric: "Atmospheric"
        },
        units: {
            pascal: { name: "Pascals", factor: 1, subcategory: "metric", symbol: "Pa" },
            kilopascal: { name: "Kilopascals", factor: 1000, subcategory: "metric", symbol: "kPa" },
            bar: { name: "Bar", factor: 100000, subcategory: "metric", symbol: "bar" },
            atmosphere: { name: "Atmospheres", factor: 101325, subcategory: "atmospheric", symbol: "atm" },
            psi: { name: "PSI", factor: 6894.76, subcategory: "imperial", symbol: "psi" },
            torr: { name: "Torr", factor: 133.322, subcategory: "atmospheric", symbol: "Torr" },
            mmHg: { name: "mmHg", factor: 133.322, subcategory: "atmospheric", symbol: "mmHg" }
        }
    },

    data: {
        name: "Digital Storage",
        baseUnit: "byte",
        subcategories: {
            all: "All Units",
            binary: "Binary (1024)",
            decimal: "Decimal (1000)",
            bits: "Bits"
        },
        units: {
            // Binary
            byte: { name: "Bytes", factor: 1, subcategory: "binary", symbol: "B" },
            kilobyte: { name: "Kilobytes (Binary)", factor: 1024, subcategory: "binary", symbol: "KiB" },
            megabyte: { name: "Megabytes (Binary)", factor: 1048576, subcategory: "binary", symbol: "MiB" },
            gigabyte: { name: "Gigabytes (Binary)", factor: 1073741824, subcategory: "binary", symbol: "GiB" },
            terabyte: { name: "Terabytes (Binary)", factor: 1099511627776, subcategory: "binary", symbol: "TiB" },
            
            // Decimal
            kilobyteDecimal: { name: "Kilobytes (Decimal)", factor: 1000, subcategory: "decimal", symbol: "KB" },
            megabyteDecimal: { name: "Megabytes (Decimal)", factor: 1000000, subcategory: "decimal", symbol: "MB" },
            gigabyteDecimal: { name: "Gigabytes (Decimal)", factor: 1000000000, subcategory: "decimal", symbol: "GB" },
            terabyteDecimal: { name: "Terabytes (Decimal)", factor: 1000000000000, subcategory: "decimal", symbol: "TB" },
            
            // Bits
            bit: { name: "Bits", factor: 0.125, subcategory: "bits", symbol: "bit" },
            kilobit: { name: "Kilobits", factor: 125, subcategory: "bits", symbol: "Kbit" },
            megabit: { name: "Megabits", factor: 125000, subcategory: "bits", symbol: "Mbit" },
            gigabit: { name: "Gigabits", factor: 125000000, subcategory: "bits", symbol: "Gbit" }
        }
    },

    fuel: {
        name: "Fuel Efficiency",
        baseUnit: "literPer100km",
        subcategories: {
            all: "All Units"
        },
        units: {
            literPer100km: { name: "Liters per 100km", symbol: "L/100km" },
            milesPerGallon: { name: "Miles per Gallon (US)", symbol: "mpg" },
            milesPerGallonImperial: { name: "Miles per Gallon (UK)", symbol: "mpg UK" },
            kilometerPerLiter: { name: "Kilometers per Liter", symbol: "km/L" }
        },
        // Special conversion functions for fuel efficiency (inverse relationships)
        convert: {
            literPer100kmToMilesPerGallon: (l100) => 235.214 / l100,
            milesPerGallonToLiterPer100km: (mpg) => 235.214 / mpg,
            literPer100kmToMilesPerGallonImperial: (l100) => 282.481 / l100,
            milesPerGallonImperialToLiterPer100km: (mpgUK) => 282.481 / mpgUK,
            literPer100kmToKilometerPerLiter: (l100) => 100 / l100,
            kilometerPerLiterToLiterPer100km: (kmL) => 100 / kmL,
            milesPerGallonToKilometerPerLiter: (mpg) => mpg * 0.425144,
            kilometerPerLiterToMilesPerGallon: (kmL) => kmL / 0.425144
        }
    },

    angle: {
        name: "Angle & Rotation",
        baseUnit: "radian",
        subcategories: {
            all: "All Units"
        },
        units: {
            radian: { name: "Radians", factor: 1, symbol: "rad" },
            degree: { name: "Degrees", factor: Math.PI / 180, symbol: "°" },
            gradian: { name: "Gradians", factor: Math.PI / 200, symbol: "gon" },
            turn: { name: "Turns", factor: 2 * Math.PI, symbol: "turn" },
            arcminute: { name: "Arcminutes", factor: Math.PI / 10800, symbol: "'" },
            arcsecond: { name: "Arcseconds", factor: Math.PI / 648000, symbol: '"' }
        }
    },

    frequency: {
        name: "Frequency",
        baseUnit: "hertz",
        subcategories: {
            all: "All Units",
            audio: "Audio",
            radio: "Radio & Electronics",
            scientific: "Scientific"
        },
        units: {
            hertz: { name: "Hertz", factor: 1, subcategory: "audio", symbol: "Hz" },
            kilohertz: { name: "Kilohertz", factor: 1000, subcategory: "audio", symbol: "kHz" },
            megahertz: { name: "Megahertz", factor: 1000000, subcategory: "radio", symbol: "MHz" },
            gigahertz: { name: "Gigahertz", factor: 1000000000, subcategory: "radio", symbol: "GHz" },
            terahertz: { name: "Terahertz", factor: 1000000000000, subcategory: "scientific", symbol: "THz" },
            rpm: { name: "Revolutions per Minute", factor: 1/60, subcategory: "audio", symbol: "rpm" },
            beatsPerMinute: { name: "Beats per Minute", factor: 1/60, subcategory: "audio", symbol: "bpm" }
        }
    },

    force: {
        name: "Force",
        baseUnit: "newton",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial",
            small: "Small Forces"
        },
        units: {
            newton: { name: "Newtons", factor: 1, subcategory: "metric", symbol: "N" },
            kilonewton: { name: "Kilonewtons", factor: 1000, subcategory: "metric", symbol: "kN" },
            dyne: { name: "Dynes", factor: 0.00001, subcategory: "small", symbol: "dyn" },
            poundForce: { name: "Pound-force", factor: 4.448222, subcategory: "imperial", symbol: "lbf" },
            ounceForce: { name: "Ounce-force", factor: 0.278014, subcategory: "imperial", symbol: "ozf" },
            kilogramForce: { name: "Kilogram-force", factor: 9.80665, subcategory: "metric", symbol: "kgf" },
            gramForce: { name: "Gram-force", factor: 0.00980665, subcategory: "small", symbol: "gf" }
        }
    },

    electrical: {
        name: "Electrical",
        baseUnit: "ampere",
        subcategories: {
            all: "All Units",
            current: "Current",
            voltage: "Voltage", 
            resistance: "Resistance",
            power: "Power",
            capacitance: "Capacitance"
        },
        units: {
            // Current
            ampere: { name: "Amperes", factor: 1, subcategory: "current", symbol: "A" },
            milliampere: { name: "Milliamperes", factor: 0.001, subcategory: "current", symbol: "mA" },
            microampere: { name: "Microamperes", factor: 0.000001, subcategory: "current", symbol: "μA" },
            kiloampere: { name: "Kiloamperes", factor: 1000, subcategory: "current", symbol: "kA" },
            
            // Note: For this simplified implementation, we'll treat these as separate conversions
            // In a real app, these would be separate categories since they're different units
        }
    },

    flowRate: {
        name: "Flow Rate",
        baseUnit: "literPerSecond",
        subcategories: {
            all: "All Units",
            liquid: "Liquid Flow",
            gas: "Gas Flow",
            small: "Small Flows"
        },
        units: {
            literPerSecond: { name: "Liters per Second", factor: 1, subcategory: "liquid", symbol: "L/s" },
            literPerMinute: { name: "Liters per Minute", factor: 1/60, subcategory: "liquid", symbol: "L/min" },
            literPerHour: { name: "Liters per Hour", factor: 1/3600, subcategory: "liquid", symbol: "L/h" },
            cubicMeterPerSecond: { name: "Cubic Meters per Second", factor: 1000, subcategory: "liquid", symbol: "m³/s" },
            cubicMeterPerHour: { name: "Cubic Meters per Hour", factor: 1000/3600, subcategory: "liquid", symbol: "m³/h" },
            gallonPerMinute: { name: "Gallons per Minute (US)", factor: 3.78541/60, subcategory: "liquid", symbol: "GPM" },
            gallonPerHour: { name: "Gallons per Hour (US)", factor: 3.78541/3600, subcategory: "liquid", symbol: "GPH" },
            cubicFootPerSecond: { name: "Cubic Feet per Second", factor: 28.3168, subcategory: "gas", symbol: "ft³/s" },
            cubicFootPerMinute: { name: "Cubic Feet per Minute", factor: 28.3168/60, subcategory: "gas", symbol: "CFM" },
            milliliterPerMinute: { name: "Milliliters per Minute", factor: 0.001/60, subcategory: "small", symbol: "mL/min" }
        }
    },

    density: {
        name: "Density",
        baseUnit: "kilogramPerCubicMeter",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial"
        },
        units: {
            kilogramPerCubicMeter: { name: "kg per Cubic Meter", factor: 1, subcategory: "metric", symbol: "kg/m³" },
            gramPerCubicCentimeter: { name: "g per Cubic Centimeter", factor: 1000, subcategory: "metric", symbol: "g/cm³" },
            gramPerLiter: { name: "Grams per Liter", factor: 1, subcategory: "metric", symbol: "g/L" },
            poundPerCubicFoot: { name: "Pounds per Cubic Foot", factor: 16.0185, subcategory: "imperial", symbol: "lb/ft³" },
            poundPerCubicInch: { name: "Pounds per Cubic Inch", factor: 27679.9, subcategory: "imperial", symbol: "lb/in³" },
            poundPerGallon: { name: "Pounds per Gallon (US)", factor: 119.826, subcategory: "imperial", symbol: "lb/gal" },
            ouncePerCubicInch: { name: "Ounces per Cubic Inch", factor: 1730, subcategory: "imperial", symbol: "oz/in³" }
        }
    },

    torque: {
        name: "Torque",
        baseUnit: "newtonMeter",
        subcategories: {
            all: "All Units",
            metric: "Metric",
            imperial: "Imperial"
        },
        units: {
            newtonMeter: { name: "Newton-meters", factor: 1, subcategory: "metric", symbol: "N⋅m" },
            kilonewtonMeter: { name: "Kilonewton-meters", factor: 1000, subcategory: "metric", symbol: "kN⋅m" },
            footPound: { name: "Foot-pounds", factor: 1.35582, subcategory: "imperial", symbol: "ft⋅lb" },
            inchPound: { name: "Inch-pounds", factor: 0.112985, subcategory: "imperial", symbol: "in⋅lb" },
            kilogramMeter: { name: "Kilogram-meters", factor: 9.80665, subcategory: "metric", symbol: "kg⋅m" },
            gramCentimeter: { name: "Gram-centimeters", factor: 0.0000980665, subcategory: "metric", symbol: "g⋅cm" },
            ounceFoot: { name: "Ounce-feet", factor: 0.0847458, subcategory: "imperial", symbol: "oz⋅ft" },
            ounceInch: { name: "Ounce-inches", factor: 0.00706215, subcategory: "imperial", symbol: "oz⋅in" }
        }
    }
};

// State management
let currentCategory = 'distance';
let currentSubcategory = 'all';

// Helper function to format numbers with smart decimal places
function formatNumber(num, fromUnit, toUnit, category) {
    if (isNaN(num) || !isFinite(num)) return "Invalid";
    
    const absNum = Math.abs(num);
    
    // Very small numbers - use scientific notation
    if (absNum > 0 && absNum < 0.0001) {
        return num.toExponential(2);
    }
    
    // Very large numbers - use scientific notation  
    if (absNum > 1e9) {
        return num.toExponential(2);
    }
    
    // Category-specific formatting rules
    const categoryData = unitSystem[category];
    const toUnitData = categoryData?.units[toUnit];
    
    // Smart decimal places based on category and unit type
    let decimalPlaces;
    
    switch (category) {
        case 'temperature':
            // Temperature: 1 decimal for most, 0 for whole degrees
            decimalPlaces = (absNum % 1 === 0) ? 0 : 1;
            break;
            
        case 'time':
            // Time: depends on the unit scale
            if (toUnit.includes('nano') || toUnit.includes('micro')) {
                decimalPlaces = 2;
            } else if (toUnit === 'millisecond') {
                decimalPlaces = 1;
            } else if (toUnit === 'second' || toUnit === 'minute' || toUnit === 'hour') {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                // Days, weeks, months, years - fewer decimals
                decimalPlaces = absNum >= 1 ? 2 : 3;
            }
            break;
            
        case 'mass':
            // Mass: depends on unit scale
            if (toUnit.includes('micro') || toUnit.includes('nano') || toUnit === 'atomicMass') {
                decimalPlaces = 2;
            } else if (toUnit === 'milligram' || toUnit === 'carat') {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else if (toUnit === 'gram' || toUnit === 'ounce') {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else {
                // kg, pounds, stones, tonnes
                decimalPlaces = absNum >= 10 ? 2 : 3;
            }
            break;
            
        case 'distance':
            // Distance: depends on unit scale
            if (toUnit.includes('nano') || toUnit.includes('micro')) {
                decimalPlaces = 1;
            } else if (toUnit === 'millimeter') {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else if (toUnit === 'centimeter' || toUnit === 'inch') {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else if (toUnit === 'meter' || toUnit === 'foot' || toUnit === 'yard') {
                decimalPlaces = absNum >= 10 ? 2 : 3;
            } else {
                // km, miles, etc.
                decimalPlaces = absNum >= 1 ? 2 : 3;
            }
            break;
            
        case 'volume':
            // Volume: depends on unit scale and type
            if (toUnit === 'milliliter' || toUnit === 'cubicCentimeter') {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else if (toUnit === 'teaspoon' || toUnit === 'tablespoon') {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else if (toUnit === 'cup' || toUnit === 'fluidOunce') {
                decimalPlaces = absNum >= 10 ? 2 : 3;
            } else if (toUnit === 'liter' || toUnit === 'pint' || toUnit === 'quart') {
                decimalPlaces = absNum >= 10 ? 2 : 3;
            } else {
                // gallons, cubic meters, etc.
                decimalPlaces = absNum >= 1 ? 2 : 3;
            }
            break;
            
        case 'area':
            // Area: generally 2-3 decimals
            if (absNum >= 1000) {
                decimalPlaces = 1;
            } else if (absNum >= 1) {
                decimalPlaces = 2;
            } else {
                decimalPlaces = 3;
            }
            break;
            
        case 'speed':
            // Speed: 1-2 decimals for most
            if (toUnit === 'speedOfLight' || toUnit === 'mach') {
                decimalPlaces = 4;
            } else {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            }
            break;
            
        case 'energy':
            // Energy/Power: depends on unit
            if (toUnitData?.type === 'power') {
                // Power units (watts, hp)
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else {
                // Energy units (joules, calories, etc.)
                if (absNum >= 1000) {
                    decimalPlaces = 1;
                } else if (absNum >= 1) {
                    decimalPlaces = 2;
                } else {
                    decimalPlaces = 3;
                }
            }
            break;
            
        case 'pressure':
            // Pressure: 1-3 decimals
            decimalPlaces = absNum >= 100 ? 1 : (absNum >= 1 ? 2 : 3);
            break;
            
        case 'data':
            // Data: depends on size
            if (absNum >= 1024) {
                decimalPlaces = 1;
            } else if (absNum >= 1) {
                decimalPlaces = 2;
            } else {
                decimalPlaces = 4;
            }
            break;
            
        case 'angle':
            // Angle: depends on unit
            if (toUnit === 'radian') {
                decimalPlaces = 4;
            } else if (toUnit === 'degree') {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                decimalPlaces = 2;
            }
            break;
            
        case 'fuel':
            // Fuel efficiency: 1-2 decimals usually
            if (toUnit === 'literPer100km') {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                // MPG, km/L - typically 1 decimal
                decimalPlaces = absNum >= 10 ? 1 : 2;
            }
            break;
            
        case 'frequency':
            // Frequency: depends on scale
            if (toUnit.includes('tera') || toUnit.includes('giga')) {
                decimalPlaces = absNum >= 1 ? 2 : 3;
            } else if (toUnit.includes('mega') || toUnit.includes('kilo')) {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                // Hz, rpm, bpm
                decimalPlaces = absNum >= 100 ? 0 : (absNum >= 10 ? 1 : 2);
            }
            break;
            
        case 'force':
            // Force: 1-3 decimals
            if (toUnit.includes('kilo')) {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else if (toUnit === 'dyne' || toUnit.includes('gram')) {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else {
                decimalPlaces = absNum >= 100 ? 1 : (absNum >= 1 ? 2 : 3);
            }
            break;
            
        case 'electrical':
            // Electrical: depends on unit type
            if (toUnit.includes('kilo')) {
                decimalPlaces = absNum >= 1 ? 2 : 3;
            } else if (toUnit.includes('milli') || toUnit.includes('micro')) {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                decimalPlaces = absNum >= 10 ? 2 : 3;
            }
            break;
            
        case 'flowRate':
            // Flow rate: 1-3 decimals
            if (toUnit.includes('cubic') && toUnit.includes('second')) {
                decimalPlaces = absNum >= 1 ? 2 : 3;
            } else if (toUnit.includes('milli')) {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                decimalPlaces = absNum >= 100 ? 1 : (absNum >= 1 ? 2 : 3);
            }
            break;
            
        case 'density':
            // Density: 1-3 decimals
            if (toUnit.includes('kilogram')) {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else if (toUnit.includes('gram')) {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else {
                decimalPlaces = absNum >= 100 ? 1 : (absNum >= 1 ? 2 : 3);
            }
            break;
            
        case 'torque':
            // Torque: 1-3 decimals
            if (toUnit.includes('kilo')) {
                decimalPlaces = absNum >= 10 ? 1 : 2;
            } else if (toUnit.includes('gram') || toUnit.includes('ounce')) {
                decimalPlaces = absNum >= 100 ? 1 : 2;
            } else {
                decimalPlaces = absNum >= 100 ? 1 : (absNum >= 1 ? 2 : 3);
            }
            break;
            
        default:
            // Fallback: general smart formatting
            if (absNum >= 1000) {
                decimalPlaces = 1;
            } else if (absNum >= 10) {
                decimalPlaces = 2;
            } else if (absNum >= 1) {
                decimalPlaces = 3;
            } else {
                decimalPlaces = 4;
            }
    }
    
    // Apply the decimal places
    const formatted = num.toFixed(decimalPlaces);
    
    // Remove trailing zeros after decimal point
    return parseFloat(formatted).toString();
}

// Clear messages
function clearMessages() {
    document.getElementById("errorMessage").textContent = "";
    document.getElementById("hintMessage").textContent = "";
}

// Show error message
function showError(message) {
    document.getElementById("errorMessage").textContent = message;
    document.getElementById("hintMessage").textContent = "";
}

// Show hint message
function showHint(message) {
    document.getElementById("hintMessage").textContent = message;
    document.getElementById("errorMessage").textContent = "";
}

// Convert between any two units
function convertUnits(value, fromUnit, toUnit, category) {
    if (isNaN(value) || value === "") return null;
    
    const categoryData = unitSystem[category];
    if (!categoryData) return null;
    
    // Special case for temperature
    if (category === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }
    
    // Special case for fuel efficiency
    if (category === 'fuel') {
        return convertFuelEfficiency(value, fromUnit, toUnit);
    }
    
    // Standard conversion through base unit
    const fromUnitData = categoryData.units[fromUnit];
    const toUnitData = categoryData.units[toUnit];
    
    if (!fromUnitData || !toUnitData) return null;
    
    // Validate power units aren't mixed with energy units
    if (fromUnitData.type === 'power' && !toUnitData.type) return null;
    if (!fromUnitData.type && toUnitData.type === 'power') return null;
    
    // Convert to base unit, then to target unit
    const baseValue = value * fromUnitData.factor;
    const result = baseValue / toUnitData.factor;
    
    return result;
}

// Special temperature conversion
function convertTemperature(value, fromUnit, toUnit) {
    const tempSystem = unitSystem.temperature;
    
    if (fromUnit === toUnit) return value;
    
    // Convert to Celsius first
    let celsius;
    switch (fromUnit) {
        case 'celsius': celsius = value; break;
        case 'fahrenheit': celsius = tempSystem.convert.fahrenheitToCelsius(value); break;
        case 'kelvin': celsius = tempSystem.convert.kelvinToCelsius(value); break;
        case 'rankine': celsius = tempSystem.convert.rankineToCelsius(value); break;
        default: return null;
    }
    
    // Convert from Celsius to target
    switch (toUnit) {
        case 'celsius': return celsius;
        case 'fahrenheit': return tempSystem.convert.celsiusToFahrenheit(celsius);
        case 'kelvin': return tempSystem.convert.celsiusToKelvin(celsius);
        case 'rankine': return tempSystem.convert.celsiusToRankine(celsius);
        default: return null;
    }
}

// Special fuel efficiency conversion
function convertFuelEfficiency(value, fromUnit, toUnit) {
    if (value <= 0) return null; // Fuel efficiency must be positive
    
    if (fromUnit === toUnit) return value;
    
    // Convert everything to L/100km first, then to target
    let literPer100km;
    
    switch (fromUnit) {
        case 'literPer100km':
            literPer100km = value;
            break;
        case 'milesPerGallon':
            literPer100km = 235.214 / value;
            break;
        case 'milesPerGallonImperial':
            literPer100km = 282.481 / value;
            break;
        case 'kilometerPerLiter':
            literPer100km = 100 / value;
            break;
        default:
            return null;
    }
    
    // Convert from L/100km to target unit
    switch (toUnit) {
        case 'literPer100km':
            return literPer100km;
        case 'milesPerGallon':
            return 235.214 / literPer100km;
        case 'milesPerGallonImperial':
            return 282.481 / literPer100km;
        case 'kilometerPerLiter':
            return 100 / literPer100km;
        default:
            return null;
    }
}

// Update unit selectors based on category and subcategory
function updateUnitSelectors() {
    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");
    const subcategorySection = document.getElementById("subcategorySection");
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
    
    currentCategory = categorySelect.value;
    const categoryData = unitSystem[currentCategory];
    
    if (!categoryData) return;
    
    // Update subcategory selector
    subcategorySelect.innerHTML = "";
    if (Object.keys(categoryData.subcategories).length > 1) {
        subcategorySection.style.display = "block";
        Object.entries(categoryData.subcategories).forEach(([key, name]) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = name;
            subcategorySelect.appendChild(option);
        });
    } else {
        subcategorySection.style.display = "none";
    }
    
    currentSubcategory = subcategorySelect.value || 'all';
    
    // Update unit selectors
    updateUnitOptions();
    
    // Update favorite button state
    updateFavoriteButton();
    
    // Trigger conversion
    autoConvert();
}

// Update unit options based on subcategory
function updateUnitOptions() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
    const categoryData = unitSystem[currentCategory];
    
    if (!categoryData) return;
    
    // Clear options
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";
    
    // Filter units by subcategory
    const filteredUnits = Object.entries(categoryData.units).filter(([key, unit]) => {
        if (currentSubcategory === 'all') return true;
        return unit.subcategory === currentSubcategory;
    });
    
    // Populate both selectors
    filteredUnits.forEach(([key, unit]) => {
        const fromOption = document.createElement("option");
        fromOption.value = key;
        fromOption.textContent = `${unit.name} (${unit.symbol})`;
        fromUnitSelect.appendChild(fromOption);
        
        const toOption = document.createElement("option");
        toOption.value = key;
        toOption.textContent = `${unit.name} (${unit.symbol})`;
        toUnitSelect.appendChild(toOption);
    });
    
    // Set different default selections
    if (filteredUnits.length > 1) {
        toUnitSelect.selectedIndex = 1;
    }
    
    // Update unit labels
    updateUnitLabels();
}

// Update unit labels in the UI
function updateUnitLabels() {
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const categoryData = unitSystem[currentCategory];
    
    if (!categoryData) return;
    
    const fromUnitData = categoryData.units[fromUnit];
    const toUnitData = categoryData.units[toUnit];
    
    document.getElementById("inputUnit").textContent = fromUnitData ? fromUnitData.symbol : "";
    document.getElementById("outputUnit").textContent = toUnitData ? toUnitData.symbol : "";
    
    // Update favorite button state
    updateFavoriteButton();
}

// Auto-convert function
function autoConvert() {
    clearMessages();
    
    const inputValue = parseFloat(document.getElementById("userInput").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const resultElement = document.getElementById("resultElement");
    
    updateUnitLabels();
    
    if (document.getElementById("userInput").value === "") {
        resultElement.textContent = "0";
        return;
    }
    
    if (isNaN(inputValue)) {
        showError("Please enter a valid number");
        resultElement.textContent = "Invalid";
        return;
    }
    
    if (fromUnit === toUnit) {
        resultElement.textContent = formatNumber(inputValue, fromUnit, toUnit, currentCategory);
        showHint("💡 Converting to the same unit");
        return;
    }
    
    const result = convertUnits(inputValue, fromUnit, toUnit, currentCategory);
    
    if (result !== null && isFinite(result)) {
        const formattedResult = formatNumber(result, fromUnit, toUnit, currentCategory);
        resultElement.textContent = formattedResult;
        
        // Add to recent history (only for valid conversions with input)
        if (document.getElementById("userInput").value !== "") {
            addToRecentHistory(fromUnit, toUnit, currentCategory, inputValue, formattedResult);
        }
        
        // Show helpful hints
        const absResult = Math.abs(result);
        if (absResult > 1e9) {
            showHint("💡 Very large result - check if input value is correct");
        } else if (absResult < 0.0001 && absResult > 0) {
            showHint("💡 Very small result - displayed in scientific notation");
        }
    } else {
        showError("Conversion not possible between these units");
        resultElement.textContent = "Error";
    }
}

// Swap units
function swapUnits() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
    
    const temp = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = temp;
    
    autoConvert();
}

// Initialize the app
function initializeApp() {
    // Load user preferences
    loadUserPreferences();
    
    // Build search index
    buildSearchIndex();
    
    // Set up initial state from preferences
    const sectorSelect = document.getElementById('sector');
    const complexitySelect = document.getElementById('complexityLevel');
    
    if (sectorSelect) sectorSelect.value = userPreferences.lastSector || 'all';
    if (complexitySelect) complexitySelect.value = userPreferences.lastComplexity || 'basic';
    
    // Update categories based on sector/complexity
    updateCategoriesBySector();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            swapUnits();
        }
        
        // Escape to close search results
        if (event.key === 'Escape') {
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.style.display = 'none';
            }
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        const searchSection = document.querySelector('.search-section');
        const searchResults = document.getElementById('searchResults');
        
        if (searchSection && searchResults && !searchSection.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Show welcome hint
    showHint("💡 Search for units, browse by sector, or use favorites.");
    
    // Add event listener for clear history button (with retry)
    setTimeout(() => {
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        if (clearHistoryBtn) {
            console.log('✅ Found clearHistoryBtn, adding event listener');
            clearHistoryBtn.addEventListener('click', clearRecentHistory);
        } else {
            console.error('❌ clearHistoryBtn not found');
        }
    }, 100);
}

// ===== NEW ENHANCED FUNCTIONALITY =====

// Load user preferences from localStorage
function loadUserPreferences() {
    const stored = localStorage.getItem('unitConverterPrefs');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            userPreferences = { ...userPreferences, ...parsed };
        } catch (e) {
            console.warn('Could not load user preferences:', e);
        }
    }
}

// Save user preferences to localStorage
function saveUserPreferences() {
    try {
        const dataToSave = JSON.stringify(userPreferences);
        localStorage.setItem('unitConverterPrefs', dataToSave);
        
        // Verify the save worked
        const verification = localStorage.getItem('unitConverterPrefs');
        if (verification !== dataToSave) {
            console.error('Failed to save user preferences - verification failed');
            return false;
        }
        return true;
    } catch (e) {
        console.warn('Could not save user preferences:', e);
        return false;
    }
}

// Build search index for fast searching
function buildSearchIndex() {
    searchIndex = [];
    
    // Index categories
    Object.entries(unitSystem).forEach(([categoryKey, categoryData]) => {
        searchIndex.push({
            type: 'category',
            key: categoryKey,
            name: categoryData.name,
            searchText: `${categoryData.name} ${categoryKey}`.toLowerCase()
        });
        
        // Index units
        Object.entries(categoryData.units).forEach(([unitKey, unitData]) => {
            searchIndex.push({
                type: 'unit',
                categoryKey,
                unitKey,
                name: unitData.name,
                symbol: unitData.symbol,
                searchText: `${unitData.name} ${unitData.symbol} ${unitKey} ${categoryData.name}`.toLowerCase()
            });
        });
    });
    
    // Index sectors
    Object.entries(sectorMapping).forEach(([sectorKey, categories]) => {
        if (sectorKey !== 'all') {
            searchIndex.push({
                type: 'sector',
                key: sectorKey,
                name: sectorKey.charAt(0).toUpperCase() + sectorKey.slice(1),
                searchText: `${sectorKey} sector`.toLowerCase()
            });
        }
    });
}

// Perform text search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    // Find matches
    const matches = searchIndex.filter(item => 
        item.searchText.includes(query)
    ).slice(0, 8); // Limit results
    
    if (matches.length === 0) {
        searchResults.style.display = 'none';
        return;
    }
    
    // Display results
    searchResults.innerHTML = '';
    matches.forEach(match => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        let icon = '';
        let description = '';
        
        switch (match.type) {
            case 'category':
                icon = '📂';
                description = 'Category';
                break;
            case 'unit':
                icon = '📏';
                description = `Unit in ${unitSystem[match.categoryKey].name}`;
                break;
            case 'sector':
                icon = '🏢';
                description = 'Sector';
                break;
        }
        
        resultItem.innerHTML = `
            <span class="search-icon">${icon}</span>
            <div class="search-content">
                <div class="search-name">${match.name}</div>
                <div class="search-description">${description}</div>
            </div>
        `;
        
        resultItem.onclick = () => selectSearchResult(match);
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}

// Handle search result selection
function selectSearchResult(match) {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    
    searchResults.style.display = 'none';
    searchInput.value = '';
    
    switch (match.type) {
        case 'category':
            // Switch to the category
            document.getElementById('category').value = match.key;
            updateUnitSelectors();
            break;
            
        case 'unit':
            // Switch to the category and select the unit
            document.getElementById('category').value = match.categoryKey;
            updateUnitSelectors();
            // Wait for selectors to update, then select the unit
            setTimeout(() => {
                const fromUnit = document.getElementById('fromUnit');
                const toUnit = document.getElementById('toUnit');
                
                if (fromUnit.querySelector(`option[value="${match.unitKey}"]`)) {
                    fromUnit.value = match.unitKey;
                    autoConvert();
                }
            }, 50);
            break;
            
        case 'sector':
            // Switch to the sector
            document.getElementById('sector').value = match.key;
            updateCategoriesBySector();
            break;
    }
}

// Update categories based on selected sector and complexity
function updateCategoriesBySector() {
    const sectorSelect = document.getElementById('sector');
    const complexitySelect = document.getElementById('complexityLevel');
    const categorySelect = document.getElementById('category');
    
    const selectedSector = sectorSelect.value;
    const selectedComplexity = complexitySelect.value;
    
    // Get categories for this sector
    let availableCategories = sectorMapping[selectedSector] || [];
    
    // Filter by complexity level
    const complexityCategories = complexityMapping[selectedComplexity] || [];
    availableCategories = availableCategories.filter(cat => complexityCategories.includes(cat));
    
    // Update category dropdown
    categorySelect.innerHTML = '';
    availableCategories.forEach(categoryKey => {
        if (unitSystem[categoryKey]) {
            const option = document.createElement('option');
            option.value = categoryKey;
            option.textContent = getCategoryDisplayName(categoryKey);
            categorySelect.appendChild(option);
        }
    });
    
    // Update user preferences
    userPreferences.lastSector = selectedSector;
    saveUserPreferences();
    
    // Update unit selectors
    updateUnitSelectors();
}

// Update complexity level
function updateComplexityLevel() {
    const complexitySelect = document.getElementById('complexityLevel');
    userPreferences.lastComplexity = complexitySelect.value;
    saveUserPreferences();
    
    // Refresh categories
    updateCategoriesBySector();
}

// Get category display name with emoji
function getCategoryDisplayName(categoryKey) {
    const emojiMap = {
        distance: "📏 Distance & Length",
        mass: "⚖️ Mass & Weight", 
        volume: "🥤 Volume & Liquid",
        temperature: "🌡️ Temperature",
        time: "⏰ Time",
        area: "📐 Area",
        speed: "🏃‍♂️ Speed & Velocity",
        fuel: "⛽ Fuel Efficiency",
        energy: "🔋 Energy & Power",
        pressure: "🔧 Pressure",
        data: "💾 Digital Storage",
        angle: "📐 Angle & Rotation",
        frequency: "🎵 Frequency",
        force: "💪 Force",
        electrical: "⚡ Electrical",
        flowRate: "💧 Flow Rate",
        density: "⚖️ Density",
        torque: "🔩 Torque"
    };
    return emojiMap[categoryKey] || unitSystem[categoryKey].name;
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Add active class to the clicked tab
    const clickedTab = event ? event.target : document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    currentPage = pageId;
    
    // Load page-specific content
    switch (pageId) {
        case 'favorites':
            loadFavoritesPage();
            break;
        case 'recent':
            loadRecentPage();
            break;
        case 'popular':
            loadPopularPage();
            break;
    }
}

// Add conversion to recent history
function addToRecentHistory(fromUnit, toUnit, category, inputValue, result) {
    const recentItem = {
        fromUnit,
        toUnit,
        category,
        inputValue,
        result,
        timestamp: Date.now(),
        displayName: `${inputValue} ${unitSystem[category].units[fromUnit].symbol} → ${result} ${unitSystem[category].units[toUnit].symbol}`
    };
    
    // Remove any existing identical conversion
    userPreferences.recent = userPreferences.recent.filter(item => 
        !(item.fromUnit === fromUnit && item.toUnit === toUnit && item.category === category)
    );
    
    // Add to beginning
    userPreferences.recent.unshift(recentItem);
    
    // Keep only last 50 items
    userPreferences.recent = userPreferences.recent.slice(0, 50);
    
    // Update popular stats
    updatePopularStats(category, fromUnit, toUnit);
    
    saveUserPreferences();
}

// Update popular statistics
function updatePopularStats(category, fromUnit, toUnit) {
    // Count category usage
    userPreferences.popularCategories[category] = (userPreferences.popularCategories[category] || 0) + 1;
    
    // Count conversion usage
    const conversionKey = `${category}:${fromUnit}:${toUnit}`;
    userPreferences.popularConversions[conversionKey] = (userPreferences.popularConversions[conversionKey] || 0) + 1;
}

// Toggle favorite conversion
function toggleFavorite() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const category = currentCategory;
    
    if (!fromUnit || !toUnit || !category) return;
    
    const favoriteKey = `${category}:${fromUnit}:${toUnit}`;
    const favoriteItem = {
        key: favoriteKey,
        fromUnit,
        toUnit,
        category,
        displayName: `${unitSystem[category].units[fromUnit].name} → ${unitSystem[category].units[toUnit].name}`,
        categoryName: unitSystem[category].name,
        timestamp: Date.now()
    };
    
    const existingIndex = userPreferences.favorites.findIndex(fav => fav.key === favoriteKey);
    const favBtn = document.getElementById('favBtn');
    
    if (existingIndex >= 0) {
        // Remove from favorites
        userPreferences.favorites.splice(existingIndex, 1);
        favBtn.textContent = '⭐';
        favBtn.title = 'Add to favorites';
        showHint('💔 Removed from favorites');
    } else {
        // Add to favorites
        userPreferences.favorites.unshift(favoriteItem);
        favBtn.textContent = '⭐';
        favBtn.title = 'Remove from favorites';
        showHint('❤️ Added to favorites');
    }
    
    saveUserPreferences();
}

// Update favorite button state
function updateFavoriteButton() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const favBtn = document.getElementById('favBtn');
    const favoriteButton = document.getElementById('favoriteButton');
    
    if (!fromUnit || !toUnit) {
        favoriteButton.style.display = 'none';
        return;
    }
    
    favoriteButton.style.display = 'block';
    
    const favoriteKey = `${currentCategory}:${fromUnit}:${toUnit}`;
    const isFavorite = userPreferences.favorites.some(fav => fav.key === favoriteKey);
    
    if (isFavorite) {
        favBtn.textContent = '⭐';
        favBtn.title = 'Remove from favorites';
        favBtn.classList.add('favorited');
    } else {
        favBtn.textContent = '⭐';
        favBtn.title = 'Add to favorites';
        favBtn.classList.remove('favorited');
    }
}

// Load favorites page
function loadFavoritesPage() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (userPreferences.favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⭐</div>
                <div class="empty-state-text">No favorites yet!</div>
                <div class="empty-state-subtext">Use the ⭐ button on conversions to add them here.</div>
            </div>
        `;
        return;
    }
    
    favoritesList.innerHTML = '';
    userPreferences.favorites.forEach((favorite, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'list-item';
        favoriteItem.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-title">${favorite.displayName}</div>
                <div class="list-item-subtitle">${favorite.categoryName}</div>
            </div>
            <div class="list-item-actions">
                <button onclick="useFavorite(${index})" class="btn-small btn-use">Use</button>
                <button onclick="removeFavorite(${index})" class="btn-small btn-remove">✕</button>
            </div>
        `;
        favoritesList.appendChild(favoriteItem);
    });
}

// Use a favorite conversion
function useFavorite(index) {
    const favorite = userPreferences.favorites[index];
    if (!favorite) return;
    
    // Switch to converter page
    showPage('converter');
    
    // Set up the conversion
    document.getElementById('category').value = favorite.category;
    updateUnitSelectors();
    
    setTimeout(() => {
        document.getElementById('fromUnit').value = favorite.fromUnit;
        document.getElementById('toUnit').value = favorite.toUnit;
        autoConvert();
    }, 50);
}

// Remove favorite
function removeFavorite(index) {
    if (index >= 0 && index < userPreferences.favorites.length) {
        userPreferences.favorites.splice(index, 1);
        saveUserPreferences();
        loadFavoritesPage();
    }
}

// Load recent page
function loadRecentPage() {
    const recentList = document.getElementById('recentList');
    
    if (!recentList) {
        console.error('recentList element not found');
        return;
    }
    
    if (userPreferences.recent.length === 0) {
        recentList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🕒</div>
                <div class="empty-state-text">No recent conversions yet!</div>
                <div class="empty-state-subtext">Start converting units to see your recent history here.</div>
            </div>
        `;
        return;
    }
    
    recentList.innerHTML = '';
    userPreferences.recent.slice(0, 20).forEach((recent, index) => {
        const recentItem = document.createElement('div');
        recentItem.className = 'list-item';
        
        const date = new Date(recent.timestamp).toLocaleDateString();
        const time = new Date(recent.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        recentItem.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-title">${recent.displayName}</div>
                <div class="list-item-subtitle">${unitSystem[recent.category].name} • ${date} ${time}</div>
            </div>
            <div class="list-item-actions">
                <button onclick="useRecent(${index})" class="btn-small btn-use">Use</button>
            </div>
        `;
        recentList.appendChild(recentItem);
    });
}

// Use a recent conversion
function useRecent(index) {
    const recent = userPreferences.recent[index];
    if (!recent) return;
    
    // Switch to converter page
    showPage('converter');
    
    // Set up the conversion
    document.getElementById('category').value = recent.category;
    updateUnitSelectors();
    
    setTimeout(() => {
        document.getElementById('fromUnit').value = recent.fromUnit;
        document.getElementById('toUnit').value = recent.toUnit;
        document.getElementById('userInput').value = recent.inputValue;
        autoConvert();
    }, 50);
}

// Show custom confirmation dialog
function showClearConfirmation() {
    const dialog = document.getElementById('clearConfirmationDialog');
    if (dialog) {
        dialog.style.display = 'flex';
        // Add click outside to close
        setTimeout(() => {
            dialog.addEventListener('click', function(e) {
                if (e.target === dialog) {
                    hideClearConfirmation();
                }
            });
        }, 100);
    }
}

// Hide custom confirmation dialog
function hideClearConfirmation() {
    const dialog = document.getElementById('clearConfirmationDialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// Confirm and execute clear history
function confirmClearHistory() {
    hideClearConfirmation();
    clearRecentHistory();
}

// Clear recent history (updated to remove confirm popup)
function clearRecentHistory() {
    console.log('=== CLEAR RECENT HISTORY CALLED ===');
    console.log('Clear history called, current items:', userPreferences.recent.length);
    
    // Clear the array
    userPreferences.recent = [];
    
    // Save to localStorage
    const saveSuccess = saveUserPreferences();
    
    if (!saveSuccess) {
        // Show error in a nicer way
        showError('Warning: Could not save to browser storage. History may reappear after refresh.');
        return;
    }
    
    // Immediately update the UI
    const recentList = document.getElementById('recentList');
    if (recentList) {
        recentList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">✅</div>
                <div class="empty-state-text">History cleared successfully!</div>
                <div class="empty-state-subtext">Start converting units to see your history here.</div>
            </div>
        `;
        
        // After 2 seconds, show the normal empty state
        setTimeout(() => {
            recentList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🕒</div>
                    <div class="empty-state-text">No recent conversions yet!</div>
                    <div class="empty-state-subtext">Start converting units to see your recent history here.</div>
                </div>
            `;
        }, 2000);
    }
    
    // Show success hint
    showHint('✅ Conversion history cleared successfully!');
    
    console.log('History cleared successfully');
}

// Make clearRecentHistory available globally
window.clearRecentHistory = clearRecentHistory;
window.showClearConfirmation = showClearConfirmation;
window.hideClearConfirmation = hideClearConfirmation;
window.confirmClearHistory = confirmClearHistory;

// Load popular page
function loadPopularPage() {
    const popularCategories = document.getElementById('popularCategories');
    const popularConversions = document.getElementById('popularConversions');
    
    // Popular categories
    const sortedCategories = Object.entries(userPreferences.popularCategories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
        
    if (sortedCategories.length === 0) {
        popularCategories.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <div class="empty-state-text">No usage data yet!</div>
                <div class="empty-state-subtext">Start using conversions to see popular categories here.</div>
            </div>
        `;
    } else {
        popularCategories.innerHTML = '';
        sortedCategories.forEach(([category, count]) => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="list-item-content">
                    <div class="list-item-title">${getCategoryDisplayName(category)}</div>
                    <div class="list-item-subtitle">${count} uses</div>
                </div>
            `;
            popularCategories.appendChild(item);
        });
    }
    
    // Popular conversions
    const sortedConversions = Object.entries(userPreferences.popularConversions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
        
    if (sortedConversions.length === 0) {
        popularConversions.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔥</div>
                <div class="empty-state-text">No conversion data yet!</div>
                <div class="empty-state-subtext">Start converting units to see popular conversions here.</div>
            </div>
        `;
    } else {
        popularConversions.innerHTML = '';
        sortedConversions.forEach(([conversionKey, count]) => {
            const [category, fromUnit, toUnit] = conversionKey.split(':');
            const categoryData = unitSystem[category];
            
            if (categoryData && categoryData.units[fromUnit] && categoryData.units[toUnit]) {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.style.cursor = 'pointer';
                item.innerHTML = `
                    <div class="list-item-content">
                        <div class="list-item-title">
                            ${categoryData.units[fromUnit].name} → ${categoryData.units[toUnit].name}
                        </div>
                        <div class="list-item-subtitle">${count} uses</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn-small btn-use">Use</button>
                    </div>
                `;
                
                const useButton = item.querySelector('.btn-small');
                useButton.onclick = (e) => {
                    e.stopPropagation();
                    // Switch to converter and set up this conversion
                    showPage('converter');
                    document.getElementById('category').value = category;
                    updateUnitSelectors();
                    
                    setTimeout(() => {
                        document.getElementById('fromUnit').value = fromUnit;
                        document.getElementById('toUnit').value = toUnit;
                        autoConvert();
                    }, 50);
                };
                
                popularConversions.appendChild(item);
            }
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Debug function to check user preferences (for testing)
function debugUserPrefs() {
    console.log('Current userPreferences:', userPreferences);
    console.log('Recent history length:', userPreferences.recent.length);
    console.log('Local storage item:', localStorage.getItem('unitConverterPrefs'));
    return userPreferences;
}

// Make debugUserPrefs available globally for testing
window.debugUserPrefs = debugUserPrefs;

// Legacy compatibility
function filterConversions() {
    updateUnitSelectors();
}

// Test function to manually add some recent history for testing
function testAddRecentHistory() {
    console.log('=== MANUAL TEST ===');
    addToRecentHistory('meter', 'foot', 'distance', '10', '32.81');
    addToRecentHistory('kilogram', 'pound', 'mass', '5', '11.02');
    loadRecentPage();
    console.log('Added test recent history items');
}

// Make test function available globally
window.testAddRecentHistory = testAddRecentHistory;

// Test function to manually clear recent history for testing
function testClearRecentHistory() {
    if (confirm('Are you sure you want to CLEAR all recent history?')) {
        userPreferences.recent = [];
        saveUserPreferences();
        loadRecentPage();
        alert('Recent history cleared!');
    }
}

// Make test clear function available globally
window.testClearRecentHistory = testClearRecentHistory;

// Final check - script loaded successfully
console.log('✅ Script loaded successfully');
console.log('clearRecentHistory function available:', typeof clearRecentHistory);
console.log('testClearRecentHistory function available:', typeof testClearRecentHistory);
console.log('userPreferences initialized:', typeof userPreferences);