// Advanced Unit Conversion System with Cross-Category Support
// All units are stored with conversion factors to their base unit

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
        resultElement.textContent = formatNumber(result, fromUnit, toUnit, currentCategory);
        
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
    // Set up initial state
    updateUnitSelectors();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            swapUnits();
        }
    });
    
    // Show welcome hint
    showHint("💡 Select any units within a category to convert. Use Ctrl+S to quickly swap units.");
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Legacy compatibility
function filterConversions() {
    updateUnitSelectors();
}