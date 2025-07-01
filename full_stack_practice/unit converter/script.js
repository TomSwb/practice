// Global state
let currentConversion = null;
let isSwapped = false;

// Conversion data structure - more maintainable and scalable
const conversions = {
    // Distance/Length
    "milesToKm": { factor: 1.60934, from: "miles", to: "km", category: "distance" },
    "kmToMiles": { factor: 1/1.60934, from: "km", to: "miles", category: "distance" },
    "feetToMeters": { factor: 0.3048, from: "feet", to: "meters", category: "distance" },
    "metersToFeet": { factor: 1/0.3048, from: "meters", to: "feet", category: "distance" },
    "inchesToCm": { factor: 2.54, from: "inches", to: "cm", category: "distance" },
    "cmToInches": { factor: 1/2.54, from: "cm", to: "inches", category: "distance" },
    "yardsToMeters": { factor: 0.9144, from: "yards", to: "meters", category: "distance" },
    "metersToYards": { factor: 1/0.9144, from: "meters", to: "yards", category: "distance" },
    "mmToInches": { factor: 0.0393701, from: "mm", to: "inches", category: "distance" },
    "inchesToMm": { factor: 25.4, from: "inches", to: "mm", category: "distance" },
    "nauticalMilesToMiles": { factor: 1.15078, from: "nautical miles", to: "miles", category: "distance" },
    "milesToNauticalMiles": { factor: 1/1.15078, from: "miles", to: "nautical miles", category: "distance" },
    
    // Weight
    "kgToLb": { factor: 2.20462, from: "kg", to: "lb", category: "weight" },
    "lbToKg": { factor: 1/2.20462, from: "lb", to: "kg", category: "weight" },
    "ozToGrams": { factor: 28.3495, from: "oz", to: "grams", category: "weight" },
    "gramsToOz": { factor: 1/28.3495, from: "grams", to: "oz", category: "weight" },
    "stonesToLb": { factor: 14, from: "stones", to: "lb", category: "weight" },
    "lbToStones": { factor: 1/14, from: "lb", to: "stones", category: "weight" },
    "metricTonsToLb": { factor: 2204.62, from: "metric tons", to: "lb", category: "weight" },
    "lbToMetricTons": { factor: 1/2204.62, from: "lb", to: "metric tons", category: "weight" },
    "caratsToGrams": { factor: 0.2, from: "carats", to: "grams", category: "weight" },
    "gramsToCarats": { factor: 5, from: "grams", to: "carats", category: "weight" },
    
    // Volume
    "gallonsToLiters": { factor: 3.78541, from: "gallons", to: "liters", category: "volume" },
    "litersToGallons": { factor: 1/3.78541, from: "liters", to: "gallons", category: "volume" },
    "flOzToMl": { factor: 29.5735, from: "fl oz", to: "ml", category: "volume" },
    "mlToFlOz": { factor: 1/29.5735, from: "ml", to: "fl oz", category: "volume" },
    "cupsToMl": { factor: 236.588, from: "cups", to: "ml", category: "volume" },
    "mlToCups": { factor: 1/236.588, from: "ml", to: "cups", category: "volume" },
    "pintsToLiters": { factor: 0.473176, from: "pints", to: "liters", category: "volume" },
    "litersToPints": { factor: 1/0.473176, from: "liters", to: "pints", category: "volume" },
    "quartsToLiters": { factor: 0.946353, from: "quarts", to: "liters", category: "volume" },
    "litersToQuarts": { factor: 1/0.946353, from: "liters", to: "quarts", category: "volume" },
    "litersToCubicFeet": { factor: 0.0353147, from: "liters", to: "cubic feet", category: "volume" },
    "cubicFeetToLiters": { factor: 28.3168, from: "cubic feet", to: "liters", category: "volume" },
    "imperialGallonsToLiters": { factor: 4.54609, from: "imperial gallons", to: "liters", category: "volume" },
    "litersToImperialGallons": { factor: 1/4.54609, from: "liters", to: "imperial gallons", category: "volume" },
    
    // Speed
    "mphToKmh": { factor: 1.60934, from: "mph", to: "km/h", category: "speed" },
    "kmhToMph": { factor: 1/1.60934, from: "km/h", to: "mph", category: "speed" },
    
    // Area
    "sqFtToSqM": { factor: 0.092903, from: "sq ft", to: "sq m", category: "area" },
    "sqMToSqFt": { factor: 1/0.092903, from: "sq m", to: "sq ft", category: "area" },
    "acresToHectares": { factor: 0.404686, from: "acres", to: "hectares", category: "area" },
    "hectaresToAcres": { factor: 1/0.404686, from: "hectares", to: "acres", category: "area" },
    
    // Pressure
    "psiToBar": { factor: 0.0689476, from: "psi", to: "bar", category: "pressure" },
    "barToPsi": { factor: 1/0.0689476, from: "bar", to: "psi", category: "pressure" },
    "psiToKpa": { factor: 6.89476, from: "psi", to: "kPa", category: "pressure" },
    "kpaToPsi": { factor: 1/6.89476, from: "kPa", to: "psi", category: "pressure" },
    
    // Power
    "hpToKw": { factor: 0.745699, from: "hp", to: "kW", category: "power" },
    "kwToHp": { factor: 1/0.745699, from: "kW", to: "hp", category: "power" },
    
    // Cooking
    "tbspToMl": { factor: 14.7868, from: "tbsp", to: "ml", category: "cooking" },
    "mlToTbsp": { factor: 1/14.7868, from: "ml", to: "tbsp", category: "cooking" },
    "tspToMl": { factor: 4.92892, from: "tsp", to: "ml", category: "cooking" },
    "mlToTsp": { factor: 1/4.92892, from: "ml", to: "tsp", category: "cooking" },
    
    // Energy
    "caloriesToJoules": { factor: 4.184, from: "calories", to: "joules", category: "energy" },
    "joulesToCalories": { factor: 1/4.184, from: "joules", to: "calories", category: "energy" },
    "btuToKwh": { factor: 0.000293071, from: "BTU", to: "kWh", category: "energy" },
    "kwhToBtu": { factor: 3412.14, from: "kWh", to: "BTU", category: "energy" },
    "caloriesToBtu": { factor: 0.00396567, from: "calories", to: "BTU", category: "energy" },
    "btuToCalories": { factor: 252.164, from: "BTU", to: "calories", category: "energy" },
    
    // Data Storage
    "bytesToKb": { factor: 1/1024, from: "bytes", to: "KB", category: "data" },
    "kbToBytes": { factor: 1024, from: "KB", to: "bytes", category: "data" },
    "kbToMb": { factor: 1/1024, from: "KB", to: "MB", category: "data" },
    "mbToKb": { factor: 1024, from: "MB", to: "KB", category: "data" },
    "mbToGb": { factor: 1/1024, from: "MB", to: "GB", category: "data" },
    "gbToMb": { factor: 1024, from: "GB", to: "MB", category: "data" },
    "gbToTb": { factor: 1/1024, from: "GB", to: "TB", category: "data" },
    "tbToGb": { factor: 1024, from: "TB", to: "GB", category: "data" },
    "bitsToBytes": { factor: 1/8, from: "bits", to: "bytes", category: "data" },
    "bytesToBits": { factor: 8, from: "bytes", to: "bits", category: "data" },
    
    // Time
    "hoursToMinutes": { factor: 60, from: "hours", to: "minutes", category: "time" },
    "minutesToHours": { factor: 1/60, from: "minutes", to: "hours", category: "time" },
    "minutesToSeconds": { factor: 60, from: "minutes", to: "seconds", category: "time" },
    "secondsToMinutes": { factor: 1/60, from: "seconds", to: "minutes", category: "time" },
    "daysToHours": { factor: 24, from: "days", to: "hours", category: "time" },
    "hoursToDays": { factor: 1/24, from: "hours", to: "days", category: "time" },
    "weeksToDays": { factor: 7, from: "weeks", to: "days", category: "time" },
    "daysToWeeks": { factor: 1/7, from: "days", to: "weeks", category: "time" },
    "yearsToDays": { factor: 365.25, from: "years", to: "days", category: "time" },
    "daysToYears": { factor: 1/365.25, from: "days", to: "years", category: "time" },
    
    // Angle
    "degreesToRadians": { factor: Math.PI/180, from: "degrees", to: "radians", category: "angle" },
    "radiansToDegrees": { factor: 180/Math.PI, from: "radians", to: "degrees", category: "angle" },
    "degreesToGradians": { factor: 10/9, from: "degrees", to: "gradians", category: "angle" },
    "gradiansToDegrees": { factor: 9/10, from: "gradians", to: "degrees", category: "angle" }
};

// Special conversion cases (non-linear)
const specialConversions = {
    "celsiusToFahrenheit": {
        convert: (value) => (value * 9/5) + 32,
        from: "°C", to: "°F", category: "temperature"
    },
    "fahrenheitToCelsius": {
        convert: (value) => (value - 32) * 5/9,
        from: "°F", to: "°C", category: "temperature"
    },
    "mpgToLper100km": {
        convert: (value) => 235.214 / value,
        from: "mpg", to: "L/100km", category: "fuel"
    },
    "lper100kmToMpg": {
        convert: (value) => 235.214 / value,
        from: "L/100km", to: "mpg", category: "fuel"
    }
};

// Helper function to format numbers
function formatNumber(num) {
    if (isNaN(num) || !isFinite(num)) return "Invalid";
    
    const absNum = Math.abs(num);
    
    // For very small numbers, use scientific notation
    if (absNum > 0 && absNum < 0.0001) {
        return num.toExponential(3);
    }
    
    // For very large numbers, use scientific notation
    if (absNum > 1e6) {
        return num.toExponential(3);
    }
    
    // For regular numbers, use appropriate decimal places
    if (absNum >= 1000) {
        return num.toFixed(2);
    } else if (absNum >= 1) {
        return num.toFixed(3);
    } else {
        return num.toFixed(4);
    }
}

// Clear error and hint messages
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

// Update unit labels
function updateUnitLabels() {
    const unitSelect = document.getElementById("unit");
    const selectedValue = unitSelect.value;
    const inputUnitSpan = document.getElementById("inputUnit");
    const outputUnitSpan = document.getElementById("outputUnit");
    
    let conversion = conversions[selectedValue] || specialConversions[selectedValue];
    
    if (conversion) {
        if (isSwapped) {
            inputUnitSpan.textContent = conversion.to;
            outputUnitSpan.textContent = conversion.from;
        } else {
            inputUnitSpan.textContent = conversion.from;
            outputUnitSpan.textContent = conversion.to;
        }
    } else {
        inputUnitSpan.textContent = "";
        outputUnitSpan.textContent = "";
    }
}

// Main conversion function
function performConversion(inputValue, conversionType) {
    if (isNaN(inputValue) || inputValue === "") {
        return null;
    }
    
    let result;
    let fromUnit, toUnit;
    
    // Handle special conversions (temperature, fuel efficiency)
    if (specialConversions[conversionType]) {
        const special = specialConversions[conversionType];
        
        if (isSwapped) {
            // For temperature swaps, we need to find the reverse conversion
            if (conversionType === "celsiusToFahrenheit") {
                result = specialConversions["fahrenheitToCelsius"].convert(inputValue);
                fromUnit = special.to;
                toUnit = special.from;
            } else if (conversionType === "fahrenheitToCelsius") {
                result = specialConversions["celsiusToFahrenheit"].convert(inputValue);
                fromUnit = special.to;
                toUnit = special.from;
            } else if (conversionType === "mpgToLper100km") {
                result = specialConversions["lper100kmToMpg"].convert(inputValue);
                fromUnit = special.to;
                toUnit = special.from;
            } else if (conversionType === "lper100kmToMpg") {
                result = specialConversions["mpgToLper100km"].convert(inputValue);
                fromUnit = special.to;
                toUnit = special.from;
            }
        } else {
            result = special.convert(inputValue);
            fromUnit = special.from;
            toUnit = special.to;
        }
        
        // Validation for special cases
        if (conversionType.includes("mpg") || conversionType.includes("lper100km")) {
            if (inputValue <= 0) {
                showError("Fuel efficiency must be greater than 0");
                return null;
            }
        }
    }
    // Handle standard linear conversions
    else if (conversions[conversionType]) {
        const conversion = conversions[conversionType];
        
        if (isSwapped) {
            result = inputValue / conversion.factor;
            fromUnit = conversion.to;
            toUnit = conversion.from;
        } else {
            result = inputValue * conversion.factor;
            fromUnit = conversion.from;
            toUnit = conversion.to;
        }
    } else {
        showError("Unknown conversion type");
        return null;
    }
    
    // Validation checks
    if (!isFinite(result)) {
        showError("Result is too large or invalid");
        return null;
    }
    
    if (result < 0 && (conversionType.includes("temperature") === false)) {
        // Most conversions shouldn't result in negative values (except temperature)
        if (inputValue < 0) {
            showHint("Tip: Most measurements should be positive values");
        }
    }
    
    return {
        result: result,
        fromUnit: fromUnit,
        toUnit: toUnit,
        inputValue: inputValue
    };
}

// Auto-convert function (called on input change)
function autoConvert() {
    clearMessages();
    
    const inputValue = parseFloat(document.getElementById("userInput").value);
    const conversionType = document.getElementById("unit").value;
    const resultElement = document.getElementById("resultElement");
    
    // Update unit labels
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
    
    const conversionResult = performConversion(inputValue, conversionType);
    
    if (conversionResult) {
        resultElement.textContent = formatNumber(conversionResult.result);
        clearMessages();
        
        // Show helpful hints for extreme values
        const absResult = Math.abs(conversionResult.result);
        if (absResult > 1e6) {
            showHint("💡 Very large result - check if input value is correct");
        } else if (absResult < 0.0001 && absResult > 0) {
            showHint("💡 Very small result - displayed in scientific notation");
        }
    } else {
        resultElement.textContent = "Error";
    }
}

// Swap conversion direction
function swapConversion() {
    isSwapped = !isSwapped;
    const swapButton = document.getElementById("swapButton");
    
    // Update button appearance
    if (isSwapped) {
        swapButton.innerHTML = "⇄ Swapped";
        swapButton.style.backgroundColor = "#e3f2fd";
    } else {
        swapButton.innerHTML = "⇄ Swap";
        swapButton.style.backgroundColor = "";
    }
    
    // Trigger conversion with new direction
    autoConvert();
}

// Filter conversions by category
function filterConversions() {
    const categorySelect = document.getElementById("category");
    const unitSelect = document.getElementById("unit");
    const selectedCategory = categorySelect.value;
    
    // Get all options in the unit select
    const allOptions = unitSelect.querySelectorAll("option");
    
    // Show/hide options based on selected category
    allOptions.forEach(option => {
        const optionCategory = option.getAttribute("data-category");
        
        if (selectedCategory === "all" || optionCategory === selectedCategory) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
    
    // Reset the unit selection to the first visible option
    const firstVisibleOption = unitSelect.querySelector("option[style*='block'], option:not([style*='none'])");
    if (firstVisibleOption) {
        unitSelect.value = firstVisibleOption.value;
    }
    
    // Reset swap state and trigger conversion
    isSwapped = false;
    document.getElementById("swapButton").innerHTML = "⇄ Swap";
    document.getElementById("swapButton").style.backgroundColor = "";
    
    // Clear result and trigger new conversion
    autoConvert();
}

// Initialize the app
function initializeApp() {
    // Set up initial state
    updateUnitLabels();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            swapConversion();
        }
    });
    
    // Show welcome hint
    showHint("💡 Tip: Type a number to see instant conversion. Use ⇄ Swap to reverse direction. Ctrl+S for quick swap.");
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Legacy function for backward compatibility (remove the old button if it exists)
function convert() {
    autoConvert();
}