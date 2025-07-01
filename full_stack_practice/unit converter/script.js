function convert() {
    const inputValue = parseFloat(document.getElementById("userInput").value);
    const unit = document.getElementById("unit").value;
    
    // Input validation
    if (isNaN(inputValue) || inputValue === "") {
        document.getElementById("resultElement").innerHTML = "Please enter a valid number";
        return;
    }

    // Conversion data structure - more maintainable and scalable
    const conversions = {
        // Distance/Length
        "milesToKm": { factor: 1.60934, from: "miles", to: "km" },
        "kmToMiles": { factor: 1/1.60934, from: "km", to: "miles" },
        "feetToMeters": { factor: 0.3048, from: "feet", to: "meters" },
        "metersToFeet": { factor: 1/0.3048, from: "meters", to: "feet" },
        "inchesToCm": { factor: 2.54, from: "inches", to: "cm" },
        "cmToInches": { factor: 1/2.54, from: "cm", to: "inches" },
        "yardsToMeters": { factor: 0.9144, from: "yards", to: "meters" },
        "metersToYards": { factor: 1/0.9144, from: "meters", to: "yards" },
        "mmToInches": { factor: 0.0393701, from: "mm", to: "inches" },
        "inchesToMm": { factor: 25.4, from: "inches", to: "mm" },
        "nauticalMilesToMiles": { factor: 1.15078, from: "nautical miles", to: "miles" },
        "milesToNauticalMiles": { factor: 1/1.15078, from: "miles", to: "nautical miles" },
        
        // Weight
        "kgToLb": { factor: 2.20462, from: "kg", to: "lb" },
        "lbToKg": { factor: 1/2.20462, from: "lb", to: "kg" },
        "ozToGrams": { factor: 28.3495, from: "oz", to: "grams" },
        "gramsToOz": { factor: 1/28.3495, from: "grams", to: "oz" },
        "stonesToLb": { factor: 14, from: "stones", to: "lb" },
        "lbToStones": { factor: 1/14, from: "lb", to: "stones" },
        "metricTonsToLb": { factor: 2204.62, from: "metric tons", to: "lb" },
        "lbToMetricTons": { factor: 1/2204.62, from: "lb", to: "metric tons" },
        "caratsToGrams": { factor: 0.2, from: "carats", to: "grams" },
        "gramsToCarats": { factor: 5, from: "grams", to: "carats" },
        
        // Volume
        "gallonsToLiters": { factor: 3.78541, from: "gallons", to: "liters" },
        "litersToGallons": { factor: 1/3.78541, from: "liters", to: "gallons" },
        "flOzToMl": { factor: 29.5735, from: "fl oz", to: "ml" },
        "mlToFlOz": { factor: 1/29.5735, from: "ml", to: "fl oz" },
        "cupsToMl": { factor: 236.588, from: "cups", to: "ml" },
        "mlToCups": { factor: 1/236.588, from: "ml", to: "cups" },
        "pintsToLiters": { factor: 0.473176, from: "pints", to: "liters" },
        "litersToPints": { factor: 1/0.473176, from: "liters", to: "pints" },
        "quartsToLiters": { factor: 0.946353, from: "quarts", to: "liters" },
        "litersToQuarts": { factor: 1/0.946353, from: "liters", to: "quarts" },
        "litersToCubicFeet": { factor: 0.0353147, from: "liters", to: "cubic feet" },
        "cubicFeetToLiters": { factor: 28.3168, from: "cubic feet", to: "liters" },
        "imperialGallonsToLiters": { factor: 4.54609, from: "imperial gallons", to: "liters" },
        "litersToImperialGallons": { factor: 1/4.54609, from: "liters", to: "imperial gallons" },
        
        // Speed
        "mphToKmh": { factor: 1.60934, from: "mph", to: "km/h" },
        "kmhToMph": { factor: 1/1.60934, from: "km/h", to: "mph" },
        
        // Area
        "sqFtToSqM": { factor: 0.092903, from: "sq ft", to: "sq m" },
        "sqMToSqFt": { factor: 1/0.092903, from: "sq m", to: "sq ft" },
        "acresToHectares": { factor: 0.404686, from: "acres", to: "hectares" },
        "hectaresToAcres": { factor: 1/0.404686, from: "hectares", to: "acres" },
        
        // Pressure
        "psiToBar": { factor: 0.0689476, from: "psi", to: "bar" },
        "barToPsi": { factor: 1/0.0689476, from: "bar", to: "psi" },
        "psiToKpa": { factor: 6.89476, from: "psi", to: "kPa" },
        "kpaToPsi": { factor: 1/6.89476, from: "kPa", to: "psi" },
        
        // Power
        "hpToKw": { factor: 0.745699, from: "hp", to: "kW" },
        "kwToHp": { factor: 1/0.745699, from: "kW", to: "hp" },
        
        // Cooking
        "tbspToMl": { factor: 14.7868, from: "tbsp", to: "ml" },
        "mlToTbsp": { factor: 1/14.7868, from: "ml", to: "tbsp" },
        "tspToMl": { factor: 4.92892, from: "tsp", to: "ml" },
        "mlToTsp": { factor: 1/4.92892, from: "ml", to: "tsp" },
        
        // Energy
        "caloriesToJoules": { factor: 4.184, from: "calories", to: "joules" },
        "joulesToCalories": { factor: 1/4.184, from: "joules", to: "calories" },
        "btuToKwh": { factor: 0.000293071, from: "BTU", to: "kWh" },
        "kwhToBtu": { factor: 3412.14, from: "kWh", to: "BTU" },
        "caloriesToBtu": { factor: 0.00396567, from: "calories", to: "BTU" },
        "btuToCalories": { factor: 252.164, from: "BTU", to: "calories" },
        
        // Data Storage
        "bytesToKb": { factor: 1/1024, from: "bytes", to: "KB" },
        "kbToBytes": { factor: 1024, from: "KB", to: "bytes" },
        "kbToMb": { factor: 1/1024, from: "KB", to: "MB" },
        "mbToKb": { factor: 1024, from: "MB", to: "KB" },
        "mbToGb": { factor: 1/1024, from: "MB", to: "GB" },
        "gbToMb": { factor: 1024, from: "GB", to: "MB" },
        "gbToTb": { factor: 1/1024, from: "GB", to: "TB" },
        "tbToGb": { factor: 1024, from: "TB", to: "GB" },
        "bitsToBytes": { factor: 1/8, from: "bits", to: "bytes" },
        "bytesToBits": { factor: 8, from: "bytes", to: "bits" },
        
        // Time
        "hoursToMinutes": { factor: 60, from: "hours", to: "minutes" },
        "minutesToHours": { factor: 1/60, from: "minutes", to: "hours" },
        "minutesToSeconds": { factor: 60, from: "minutes", to: "seconds" },
        "secondsToMinutes": { factor: 1/60, from: "seconds", to: "minutes" },
        "daysToHours": { factor: 24, from: "days", to: "hours" },
        "hoursToDays": { factor: 1/24, from: "hours", to: "days" },
        "weeksToDays": { factor: 7, from: "weeks", to: "days" },
        "daysToWeeks": { factor: 1/7, from: "days", to: "weeks" },
        "yearsToDays": { factor: 365.25, from: "years", to: "days" },
        "daysToYears": { factor: 1/365.25, from: "days", to: "years" },
        
        // Angle
        "degreesToRadians": { factor: Math.PI/180, from: "degrees", to: "radians" },
        "radiansToDegrees": { factor: 180/Math.PI, from: "radians", to: "degrees" },
        "degreesToGradians": { factor: 10/9, from: "degrees", to: "gradians" },
        "gradiansToDegrees": { factor: 9/10, from: "gradians", to: "degrees" }
    };

    let result;
    let resultString;

    // Special cases for temperature (non-linear conversions)
    if (unit === "celsiusToFahrenheit") {
        result = (inputValue * 9/5) + 32;
        resultString = `${inputValue}°C are ${result.toFixed(2)}°F`;
    } else if (unit === "fahrenheitToCelsius") {
        result = (inputValue - 32) * 5/9;
        resultString = `${inputValue}°F are ${result.toFixed(2)}°C`;
    } 
    // Special cases for fuel efficiency (inverse relationship)
    else if (unit === "mpgToLper100km") {
        result = 235.214 / inputValue;
        resultString = `${inputValue} mpg are ${result.toFixed(2)} L/100km`;
    } else if (unit === "lper100kmToMpg") {
        result = 235.214 / inputValue;
        resultString = `${inputValue} L/100km are ${result.toFixed(2)} mpg`;
    }
    // Standard linear conversions
    else if (conversions[unit]) {
        const conversion = conversions[unit];
        result = inputValue * conversion.factor;
        resultString = `${inputValue} ${conversion.from} = ${result.toFixed(2)} ${conversion.to}`;
    } else {
        resultString = "Unknown conversion type";
    }

    console.log(resultString);
    document.getElementById("resultElement").innerHTML = resultString;
}

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
    
    // Clear the result when category changes
    document.getElementById("resultElement").innerHTML = "0";
}