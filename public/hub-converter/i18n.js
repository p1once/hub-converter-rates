/**
 * Hub Converter runtime localization.
 * The catalog is intentionally source-keyed with the French text because the
 * current UI markup uses French as its source language.
 */
(function initHubConverterI18n(global) {
  const SETTINGS_STORAGE_KEY = 'hub_converter_settings';
  const LEGACY_SETTINGS_STORAGE_KEY = 'quickconvert_settings';

  'use strict';

  const SUPPORTED_LANGUAGES = ['fr', 'en', 'es', 'de'];
  const LOCALES = {
    fr: 'fr-FR',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };

  // Extended technical units are keyed by their French engine label.
  // Values are ordered as English, Spanish, German.
  const TECHNICAL_UNIT_NAMES = {
    'Nanomètre': ['Nanometer', 'Nanómetro', 'Nanometer'],
    'Micromètre': ['Micrometer', 'Micrómetro', 'Mikrometer'],
    'Décimètre': ['Decimeter', 'Decímetro', 'Dezimeter'],
    'Décamètre': ['Decameter', 'Decámetro', 'Dekameter'],
    'Hectomètre': ['Hectometer', 'Hectómetro', 'Hektometer'],
    'Yard': ['Yard', 'Yarda', 'Yard'],
    'Mille nautique': ['Nautical mile', 'Milla náutica', 'Seemeile'],
    'Unité astronomique': ['Astronomical unit', 'Unidad astronómica', 'Astronomische Einheit'],
    'Année-lumière': ['Light-year', 'Año luz', 'Lichtjahr'],
    'Parsec': ['Parsec', 'Pársec', 'Parsec'],
    'Nanogramme': ['Nanogram', 'Nanogramo', 'Nanogramm'],
    'Microgramme': ['Microgram', 'Microgramo', 'Mikrogramm'],
    'Milligramme': ['Milligram', 'Miligramo', 'Milligramm'],
    'Carat': ['Carat', 'Quilate', 'Karat'],
    'Grain': ['Grain', 'Grano', 'Gran'],
    'Stone': ['Stone', 'Stone', 'Stone'],
    'Slug': ['Slug', 'Slug', 'Slug'],
    'Short ton US': ['US short ton', 'Tonelada corta estadounidense', 'US-Kurztonne'],
    'Long ton UK': ['UK long ton', 'Tonelada larga británica', 'Britische Langtonne'],
    'Rankine': ['Rankine', 'Rankine', 'Rankine'],
    'Réaumur': ['Réaumur', 'Réaumur', 'Réaumur'],
    'Nanolitre': ['Nanoliter', 'Nanolitro', 'Nanoliter'],
    'Microlitre': ['Microliter', 'Microlitro', 'Mikroliter'],
    'Centilitre': ['Centiliter', 'Centilitro', 'Zentiliter'],
    'Décilitre': ['Deciliter', 'Decilitro', 'Deziliter'],
    'Hectolitre': ['Hectoliter', 'Hectolitro', 'Hektoliter'],
    'Millimètre cube': ['Cubic millimeter', 'Milímetro cúbico', 'Kubikmillimeter'],
    'Centimètre cube': ['Cubic centimeter', 'Centímetro cúbico', 'Kubikzentimeter'],
    'Mètre cube': ['Cubic meter', 'Metro cúbico', 'Kubikmeter'],
    'Pouce cube': ['Cubic inch', 'Pulgada cúbica', 'Kubikzoll'],
    'Pied cube': ['Cubic foot', 'Pie cúbico', 'Kubikfuß'],
    'Yard cube': ['Cubic yard', 'Yarda cúbica', 'Kubikyard'],
    'Cuillère à café US': ['US teaspoon', 'Cucharadita estadounidense', 'US-Teelöffel'],
    'Cuillère à soupe US': ['US tablespoon', 'Cucharada estadounidense', 'US-Esslöffel'],
    'Cup US': ['US cup', 'Taza estadounidense', 'US-Cup'],
    'Once fluide US': ['US fluid ounce', 'Onza líquida estadounidense', 'US-Flüssigunze'],
    'Pinte US': ['US pint', 'Pinta estadounidense', 'US-Pint'],
    'Quart US': ['US quart', 'Cuarto estadounidense', 'US-Quart'],
    'Gallon impérial': ['Imperial gallon', 'Galón imperial', 'Imperiale Gallone'],
    'Baril pétrole': ['Oil barrel', 'Barril de petróleo', 'Ölbarrel'],
    'Millimètre carré': ['Square millimeter', 'Milímetro cuadrado', 'Quadratmillimeter'],
    'Are': ['Are', 'Área', 'Ar'],
    'Yard carré': ['Square yard', 'Yarda cuadrada', 'Quadratyard'],
    'Mile carré': ['Square mile', 'Milla cuadrada', 'Quadratmeile'],
    'Mille nautique carré': ['Square nautical mile', 'Milla náutica cuadrada', 'Quadratseemeile'],
    'Millimètre/seconde': ['Millimeter/second', 'Milímetro/segundo', 'Millimeter/Sekunde'],
    'Centimètre/seconde': ['Centimeter/second', 'Centímetro/segundo', 'Zentimeter/Sekunde'],
    'Mach': ['Mach', 'Mach', 'Mach'],
    'Électron-volt': ['Electronvolt', 'Electronvoltio', 'Elektronenvolt'],
    'Mégajoule': ['Megajoule', 'Megajulio', 'Megajoule'],
    'Gigajoule': ['Gigajoule', 'Gigajulio', 'Gigajoule'],
    'Mégawatt-heure': ['Megawatt-hour', 'Megavatio-hora', 'Megawattstunde'],
    'British thermal unit': ['British thermal unit', 'Unidad térmica británica', 'Britische Wärmeeinheit'],
    'Therm': ['Therm', 'Termia', 'Therm'],
    'Foot-pound': ['Foot-pound', 'Pie-libra', 'Foot-Pound'],
    'Nanoseconde': ['Nanosecond', 'Nanosegundo', 'Nanosekunde'],
    'Microseconde': ['Microsecond', 'Microsegundo', 'Mikrosekunde'],
    'Milliseconde': ['Millisecond', 'Milisegundo', 'Millisekunde'],
    'Seconde': ['Second', 'Segundo', 'Sekunde'],
    'Minute': ['Minute', 'Minuto', 'Minute'],
    'Heure': ['Hour', 'Hora', 'Stunde'],
    'Jour': ['Day', 'Día', 'Tag'],
    'Semaine': ['Week', 'Semana', 'Woche'],
    'Mois moyen': ['Average month', 'Mes medio', 'Durchschnittsmonat'],
    'Année moyenne': ['Average year', 'Año medio', 'Durchschnittsjahr'],
    'Décennie': ['Decade', 'Década', 'Jahrzehnt'],
    'Siècle': ['Century', 'Siglo', 'Jahrhundert'],
    'Bit': ['Bit', 'Bit', 'Bit'],
    'Byte / octet': ['Byte', 'Byte', 'Byte'],
    'Kilobit': ['Kilobit', 'Kilobit', 'Kilobit'],
    'Mégabit': ['Megabit', 'Megabit', 'Megabit'],
    'Gigabit': ['Gigabit', 'Gigabit', 'Gigabit'],
    'Térabit': ['Terabit', 'Terabit', 'Terabit'],
    'Pétabit': ['Petabit', 'Petabit', 'Petabit'],
    'Kilobyte / kilooctet': ['Kilobyte', 'Kilobyte', 'Kilobyte'],
    'Mégaoctet': ['Megabyte', 'Megabyte', 'Megabyte'],
    'Gigaoctet': ['Gigabyte', 'Gigabyte', 'Gigabyte'],
    'Téraoctet': ['Terabyte', 'Terabyte', 'Terabyte'],
    'Pétaoctet': ['Petabyte', 'Petabyte', 'Petabyte'],
    'Kibioctet': ['Kibibyte', 'Kibibyte', 'Kibibyte'],
    'Mébioctet': ['Mebibyte', 'Mebibyte', 'Mebibyte'],
    'Gibioctet': ['Gibibyte', 'Gibibyte', 'Gibibyte'],
    'Tébioctet': ['Tebibyte', 'Tebibyte', 'Tebibyte'],
    'Pébioctet': ['Pebibyte', 'Pebibyte', 'Pebibyte'],
    'Pascal': ['Pascal', 'Pascal', 'Pascal'],
    'Hectopascal': ['Hectopascal', 'Hectopascal', 'Hektopascal'],
    'Kilopascal': ['Kilopascal', 'Kilopascal', 'Kilopascal'],
    'Mégapascal': ['Megapascal', 'Megapascal', 'Megapascal'],
    'Bar': ['Bar', 'Bar', 'Bar'],
    'Millibar': ['Millibar', 'Milibar', 'Millibar'],
    'Atmosphère': ['Atmosphere', 'Atmósfera', 'Atmosphäre'],
    'Pound-force per square inch': ['Pound-force per square inch', 'Libra-fuerza por pulgada cuadrada', 'Pfundkraft pro Quadratzoll'],
    'Torr': ['Torr', 'Torr', 'Torr'],
    'Millimètre de mercure': ['Millimeter of mercury', 'Milímetro de mercurio', 'Millimeter Quecksilbersäule'],
    'Pouce de mercure': ['Inch of mercury', 'Pulgada de mercurio', 'Zoll Quecksilbersäule'],
    'Kilogramme-force/cm²': ['Kilogram-force/cm²', 'Kilogramo-fuerza/cm²', 'Kilopond/cm²'],
    'Milliwatt': ['Milliwatt', 'Milivatio', 'Milliwatt'],
    'Watt': ['Watt', 'Vatio', 'Watt'],
    'Kilowatt': ['Kilowatt', 'Kilovatio', 'Kilowatt'],
    'Mégawatt': ['Megawatt', 'Megavatio', 'Megawatt'],
    'Gigawatt': ['Gigawatt', 'Gigavatio', 'Gigawatt'],
    'Horsepower mécanique': ['Mechanical horsepower', 'Caballo de fuerza mecánico', 'Mechanische Pferdestärke'],
    'Cheval-vapeur métrique': ['Metric horsepower', 'Caballo de vapor métrico', 'Metrische Pferdestärke'],
    'BTU par heure': ['BTU per hour', 'BTU por hora', 'BTU pro Stunde'],
    'Tonne de réfrigération': ['Ton of refrigeration', 'Tonelada de refrigeración', 'Kältetonne'],
    'Dyne': ['Dyne', 'Dina', 'Dyn'],
    'Newton': ['Newton', 'Newton', 'Newton'],
    'Kilonewton': ['Kilonewton', 'Kilonewton', 'Kilonewton'],
    'Méganewton': ['Meganewton', 'Meganewton', 'Meganewton'],
    'Kilogramme-force': ['Kilogram-force', 'Kilogramo-fuerza', 'Kilopond'],
    'Livre-force': ['Pound-force', 'Libra-fuerza', 'Pfundkraft'],
    'Once-force': ['Ounce-force', 'Onza-fuerza', 'Unzenkraft'],
    'Poundal': ['Poundal', 'Poundal', 'Poundal'],
    'Radian': ['Radian', 'Radián', 'Radiant'],
    'Degré': ['Degree', 'Grado', 'Grad'],
    'Grade': ['Gradian', 'Gradián', 'Gon'],
    'Tour': ['Turn', 'Vuelta', 'Umdrehung'],
    'Minute d’arc': ['Arcminute', 'Minuto de arco', 'Bogenminute'],
    'Seconde d’arc': ['Arcsecond', 'Segundo de arco', 'Bogensekunde'],
    'Hertz': ['Hertz', 'Hercio', 'Hertz'],
    'Kilohertz': ['Kilohertz', 'Kilohercio', 'Kilohertz'],
    'Mégahertz': ['Megahertz', 'Megahercio', 'Megahertz'],
    'Gigahertz': ['Gigahertz', 'Gigahercio', 'Gigahertz'],
    'Térahertz': ['Terahertz', 'Terahercio', 'Terahertz'],
    'Tours par minute': ['Revolutions per minute', 'Revoluciones por minuto', 'Umdrehungen pro Minute'],
    'Battements par minute': ['Beats per minute', 'Pulsaciones por minuto', 'Schläge pro Minute'],
    'Dyne-centimètre': ['Dyne-centimeter', 'Dina-centímetro', 'Dyn-Zentimeter'],
    'Newton-mètre': ['Newton-meter', 'Newton-metro', 'Newtonmeter'],
    'Kilonewton-mètre': ['Kilonewton-meter', 'Kilonewton-metro', 'Kilonewtonmeter'],
    'Livre-force pouce': ['Pound-force inch', 'Libra-fuerza pulgada', 'Pfundkraftzoll'],
    'Livre-force pied': ['Pound-force foot', 'Libra-fuerza pie', 'Pfundkraftfuß'],
    'Kilogramme-force mètre': ['Kilogram-force meter', 'Kilogramo-fuerza metro', 'Kilopondmeter'],
    'Once-force pouce': ['Ounce-force inch', 'Onza-fuerza pulgada', 'Unzenkraftzoll'],
    'Litres aux 100 km': ['Liters per 100 km', 'Litros por 100 km', 'Liter pro 100 km'],
    'Kilomètres par litre': ['Kilometers per liter', 'Kilómetros por litro', 'Kilometer pro Liter'],
    'Miles par gallon US': ['Miles per US gallon', 'Millas por galón estadounidense', 'Meilen pro US-Gallone'],
    'Miles par gallon impérial': ['Miles per imperial gallon', 'Millas por galón imperial', 'Meilen pro imperiale Gallone'],
    'Kilogramme/m³': ['Kilogram/m³', 'Kilogramo/m³', 'Kilogramm/m³'],
    'Gramme/litre': ['Gram/liter', 'Gramo/litro', 'Gramm/Liter'],
    'Kilogramme/litre': ['Kilogram/liter', 'Kilogramo/litro', 'Kilogramm/Liter'],
    'Gramme/millilitre': ['Gram/milliliter', 'Gramo/mililitro', 'Gramm/Milliliter'],
    'Gramme/cm³': ['Gram/cm³', 'Gramo/cm³', 'Gramm/cm³'],
    'Livre/ft³': ['Pound/ft³', 'Libra/ft³', 'Pfund/ft³'],
    'Livre/in³': ['Pound/in³', 'Libra/in³', 'Pfund/in³'],
    'Livre/gallon US': ['Pound/US gallon', 'Libra/galón estadounidense', 'Pfund/US-Gallone'],
    'Once/in³': ['Ounce/in³', 'Onza/in³', 'Unze/in³'],
    'Millilitre/seconde': ['Milliliter/second', 'Mililitro/segundo', 'Milliliter/Sekunde'],
    'Litre/seconde': ['Liter/second', 'Litro/segundo', 'Liter/Sekunde'],
    'Litre/minute': ['Liter/minute', 'Litro/minuto', 'Liter/Minute'],
    'Litre/heure': ['Liter/hour', 'Litro/hora', 'Liter/Stunde'],
    'Mètre cube/seconde': ['Cubic meter/second', 'Metro cúbico/segundo', 'Kubikmeter/Sekunde'],
    'Mètre cube/heure': ['Cubic meter/hour', 'Metro cúbico/hora', 'Kubikmeter/Stunde'],
    'Gallon US/minute': ['US gallon/minute', 'Galón estadounidense/minuto', 'US-Gallone/Minute'],
    'Gallon US/heure': ['US gallon/hour', 'Galón estadounidense/hora', 'US-Gallone/Stunde'],
    'Pied cube/minute': ['Cubic foot/minute', 'Pie cúbico/minuto', 'Kubikfuß/Minute'],
    'Microampère': ['Microampere', 'Microamperio', 'Mikroampere'],
    'Milliampère': ['Milliampere', 'Miliamperio', 'Milliampere'],
    'Ampère': ['Ampere', 'Amperio', 'Ampere'],
    'Kiloampère': ['Kiloampere', 'Kiloamperio', 'Kiloampere'],
    'Mégaampère': ['Megaampere', 'Megaamperio', 'Megaampere'],
    'Millivolt': ['Millivolt', 'Milivoltio', 'Millivolt'],
    'Volt': ['Volt', 'Voltio', 'Volt'],
    'Kilovolt': ['Kilovolt', 'Kilovoltio', 'Kilovolt'],
    'Mégavolt': ['Megavolt', 'Megavoltio', 'Megavolt'],
    'Milliohm': ['Milliohm', 'Miliohmio', 'Milliohm'],
    'Ohm': ['Ohm', 'Ohmio', 'Ohm'],
    'Kiloohm': ['Kiloohm', 'Kiloohmio', 'Kiloohm'],
    'Mégaohm': ['Megaohm', 'Megaohmio', 'Megaohm'],
    'Millicoulomb': ['Millicoulomb', 'Miliculombio', 'Millicoulomb'],
    'Coulomb': ['Coulomb', 'Culombio', 'Coulomb'],
    'Kilocoulomb': ['Kilocoulomb', 'Kiloculombio', 'Kilocoulomb'],
    'Milliampère-heure': ['Milliampere-hour', 'Miliamperio-hora', 'Milliamperestunde'],
    'Ampère-heure': ['Ampere-hour', 'Amperio-hora', 'Amperestunde'],
    'Charge': ['Electric charge', 'Carga eléctrica', 'Elektrische Ladung'],
    'nm, m, km, miles...': ['nm, m, km, miles...', 'nm, m, km, millas...', 'nm, m, km, Meilen...'],
    'mg, kg, lb, tonnes...': ['mg, kg, lb, tons...', 'mg, kg, lb, toneladas...', 'mg, kg, lb, Tonnen...'],
    'Celsius, Kelvin...': ['Celsius, Kelvin...', 'Celsius, Kelvin...', 'Celsius, Kelvin...'],
    'mL, L, gallons...': ['mL, L, gallons...', 'mL, L, galones...', 'mL, L, Gallonen...'],
    'm², hectares, acres...': ['m², hectares, acres...', 'm², hectáreas, acres...', 'm², Hektar, Acres...'],
    'km/h, mph, nœuds...': ['km/h, mph, knots...', 'km/h, mph, nudos...', 'km/h, mph, Knoten...'],
    'J, kWh, BTU...': ['J, kWh, BTU...', 'J, kWh, BTU...', 'J, kWh, BTU...'],
    'ms, minutes, années...': ['ms, minutes, years...', 'ms, minutos, años...', 'ms, Minuten, Jahre...'],
    'bits, bytes, Go...': ['bits, bytes, GB...', 'bits, bytes, GB...', 'Bits, Bytes, GB...'],
    'Pa, bar, psi...': ['Pa, bar, psi...', 'Pa, bar, psi...', 'Pa, bar, psi...'],
    'W, kW, chevaux...': ['W, kW, horsepower...', 'W, kW, caballos...', 'W, kW, Pferdestärken...'],
    'N, kgf, lbf...': ['N, kgf, lbf...', 'N, kgf, lbf...', 'N, kgf, lbf...'],
    'degrés, radians...': ['degrees, radians...', 'grados, radianes...', 'Grad, Radiant...'],
    'Hz, MHz, rpm...': ['Hz, MHz, rpm...', 'Hz, MHz, rpm...', 'Hz, MHz, U/min...'],
    'kg/m³, g/cm³...': ['kg/m³, g/cm³...', 'kg/m³, g/cm³...', 'kg/m³, g/cm³...'],
    'A, mA, kA...': ['A, mA, kA...', 'A, mA, kA...', 'A, mA, kA...'],
    'V, mV, kV...': ['V, mV, kV...', 'V, mV, kV...', 'V, mV, kV...'],
    'Ω, kΩ, MΩ...': ['Ω, kΩ, MΩ...', 'Ω, kΩ, MΩ...', 'Ω, kΩ, MΩ...'],
    'C, Ah, mAh...': ['C, Ah, mAh...', 'C, Ah, mAh...', 'C, Ah, mAh...'],
    'Accélération': ['Acceleration', 'Aceleración', 'Beschleunigung'],
    'À-coup': ['Jerk', 'Sobreaceleración', 'Ruck'],
    'Allure': ['Pace', 'Ritmo', 'Tempo'],
    'Vitesse angulaire': ['Angular velocity', 'Velocidad angular', 'Winkelgeschwindigkeit'],
    'Viscosité dynamique': ['Dynamic viscosity', 'Viscosidad dinámica', 'Dynamische Viskosität'],
    'Viscosité cinématique': ['Kinematic viscosity', 'Viscosidad cinemática', 'Kinematische Viskosität'],
    'Débit de données': ['Data rate', 'Tasa de datos', 'Datenrate'],
    'Éclairement': ['Illuminance', 'Iluminancia', 'Beleuchtungsstärke'],
    'Luminance': ['Luminance', 'Luminancia', 'Leuchtdichte'],
    'Flux lumineux': ['Luminous flux', 'Flujo luminoso', 'Lichtstrom'],
    'Intensité lumineuse': ['Luminous intensity', 'Intensidad luminosa', 'Lichtstärke'],
    'Flux magnétique': ['Magnetic flux', 'Flujo magnético', 'Magnetischer Fluss'],
    'Champ magnétique': ['Magnetic field', 'Campo magnético', 'Magnetfeld'],
    'Inductance': ['Inductance', 'Inductancia', 'Induktivität'],
    'Capacité électrique': ['Capacitance', 'Capacitancia', 'Kapazität'],
    'Conductance': ['Conductance', 'Conductancia', 'Leitwert'],
    'Résistivité': ['Resistivity', 'Resistividad', 'Spezifischer Widerstand'],
    'Conductivité': ['Conductivity', 'Conductividad', 'Leitfähigkeit'],
    'Quantité de matière': ['Amount of substance', 'Cantidad de sustancia', 'Stoffmenge'],
    'Concentration molaire': ['Molar concentration', 'Concentración molar', 'Stoffmengenkonzentration'],
    'Activité catalytique': ['Catalytic activity', 'Actividad catalítica', 'Katalytische Aktivität'],
    'Radioactivité': ['Radioactivity', 'Radiactividad', 'Radioaktivität'],
    'Dose absorbée': ['Absorbed dose', 'Dosis absorbida', 'Energiedosis'],
    'Dose équivalente': ['Equivalent dose', 'Dosis equivalente', 'Äquivalentdosis'],
    'Niveau logarithmique': ['Logarithmic level', 'Nivel logarítmico', 'Logarithmischer Pegel'],
    'Typographie': ['Typography', 'Tipografía', 'Typografie'],
    'Résolution': ['Resolution', 'Resolución', 'Auflösung'],
    'Conductivité thermique': ['Thermal conductivity', 'Conductividad térmica', 'Wärmeleitfähigkeit'],
    'Flux thermique': ['Heat flux', 'Flujo térmico', 'Wärmestromdichte'],
    'Énergie massique': ['Specific energy', 'Energía específica', 'Spezifische Energie'],
    'Capacité thermique massique': ['Specific heat capacity', 'Capacidad calorífica específica', 'Spezifische Wärmekapazität'],
    'Résistance thermique': ['Thermal resistance', 'Resistencia térmica', 'Wärmewiderstand'],
    'Tension superficielle': ['Surface tension', 'Tensión superficial', 'Oberflächenspannung'],
    'Perméabilité': ['Permeability', 'Permeabilidad', 'Permeabilität'],
    'Débit massique': ['Mass flow rate', 'Caudal másico', 'Massenstrom'],
    'Masse linéique': ['Linear density', 'Densidad lineal', 'Längendichte'],
    'Température de couleur': ['Color temperature', 'Temperatura de color', 'Farbtemperatur'],
    'Angle solide': ['Solid angle', 'Ángulo sólido', 'Raumwinkel'],
    'Rapports et proportions': ['Ratios and proportions', 'Razones y proporciones', 'Verhältnisse und Anteile'],
    'Quantité de mouvement': ['Momentum', 'Cantidad de movimiento', 'Impuls'],
    'Accélération angulaire': ['Angular acceleration', 'Aceleración angular', 'Winkelbeschleunigung'],
    'Champ magnétique H': ['Magnetic field strength H', 'Intensidad de campo magnético H', 'Magnetische Feldstärke H'],
    'Champ électrique': ['Electric field strength', 'Campo eléctrico', 'Elektrische Feldstärke'],
    'Densité de courant': ['Current density', 'Densidad de corriente', 'Stromdichte'],
    'Permittivité électrique': ['Electric permittivity', 'Permitividad eléctrica', 'Elektrische Permittivität'],
    'Masse molaire': ['Molar mass', 'Masa molar', 'Molare Masse'],
    'Molalité': ['Molality', 'Molalidad', 'Molalität'],
    'Équivalents chimiques': ['Chemical equivalents', 'Equivalentes químicos', 'Chemische Äquivalente'],
    'Osmolarité': ['Osmolarity', 'Osmolaridad', 'Osmolarität'],
    'Osmolalité': ['Osmolality', 'Osmolalidad', 'Osmolalität'],
    'Nombre d’onde': ['Wavenumber', 'Número de onda', 'Wellenzahl'],
    'Capacité thermique': ['Heat capacity', 'Capacidad térmica', 'Wärmekapazität'],
    'Exposition aux rayonnements': ['Radiation exposure', 'Exposición a la radiación', 'Strahlenexposition'],
    'Débit de dose absorbée': ['Absorbed dose rate', 'Tasa de dosis absorbida', 'Energiedosisleistung'],
    'Débit de dose équivalente': ['Equivalent dose rate', 'Tasa de dosis equivalente', 'Äquivalentdosisleistung'],
    'Concentration massique': ['Mass concentration', 'Concentración másica', 'Massenkonzentration'],
    '%, ppm, ppb, points de base...': ['%, ppm, ppb, basis points...', '%, ppm, ppb, puntos básicos...', '%, ppm, ppb, Basispunkte...'],
    'Stéradian': ['Steradian', 'Estereorradián', 'Steradiant'],
    'Millistéradian': ['Millisteradian', 'Miliestereorradián', 'Millisteradiant'],
    'Degré carré': ['Square degree', 'Grado cuadrado', 'Quadratgrad'],
    'Minute d’arc carrée': ['Square arcminute', 'Minuto de arco cuadrado', 'Quadratbogenminute'],
    'Seconde d’arc carrée': ['Square arcsecond', 'Segundo de arco cuadrado', 'Quadratbogensekunde'],
    'Spat': ['Spat', 'Spat', 'Spat'],
    'Rapport unitaire': ['Unit ratio', 'Razón unitaria', 'Einheitsverhältnis'],
    'Pour cent': ['Percent', 'Por ciento', 'Prozent'],
    'Pour mille': ['Per mille', 'Por mil', 'Promille'],
    'Partie par million': ['Part per million', 'Parte por millón', 'Teil pro Million'],
    'Partie par milliard': ['Part per billion', 'Parte por mil millones', 'Teil pro Milliarde'],
    'Partie par billion': ['Part per trillion', 'Parte por billón', 'Teil pro Billion'],
    'Point de base': ['Basis point', 'Punto básico', 'Basispunkt'],
    'Kilogramme-mètre par seconde': ['Kilogram meter per second', 'Kilogramo metro por segundo', 'Kilogrammmeter pro Sekunde'],
    'Newton-seconde': ['Newton-second', 'Newton-segundo', 'Newtonsekunde'],
    'Gramme-centimètre par seconde': ['Gram centimeter per second', 'Gramo centímetro por segundo', 'Grammzentimeter pro Sekunde'],
    'Livre-pied par seconde': ['Pound foot per second', 'Libra pie por segundo', 'Pfundfuß pro Sekunde'],
    'Slug-pied par seconde': ['Slug foot per second', 'Slug pie por segundo', 'Slugfuß pro Sekunde'],
    'Radian par seconde carrée': ['Radian per square second', 'Radián por segundo cuadrado', 'Radiant pro Quadratsekunde'],
    'Degré par seconde carrée': ['Degree per square second', 'Grado por segundo cuadrado', 'Grad pro Quadratsekunde'],
    'Tour par seconde carrée': ['Turn per square second', 'Vuelta por segundo cuadrado', 'Umdrehung pro Quadratsekunde'],
    'Tour par minute par seconde': ['Revolution per minute per second', 'Revolución por minuto por segundo', 'Umdrehung pro Minute pro Sekunde'],
    'Ampère par mètre': ['Ampere per meter', 'Amperio por metro', 'Ampere pro Meter'],
    'Milliampère par mètre': ['Milliampere per meter', 'Miliamperio por metro', 'Milliampere pro Meter'],
    'Kiloampère par mètre': ['Kiloampere per meter', 'Kiloamperio por metro', 'Kiloampere pro Meter'],
    'Oersted': ['Oersted', 'Oersted', 'Oersted'],
    'Volt par mètre': ['Volt per meter', 'Voltio por metro', 'Volt pro Meter'],
    'Millivolt par mètre': ['Millivolt per meter', 'Milivoltio por metro', 'Millivolt pro Meter'],
    'Kilovolt par mètre': ['Kilovolt per meter', 'Kilovoltio por metro', 'Kilovolt pro Meter'],
    'Volt par centimètre': ['Volt per centimeter', 'Voltio por centímetro', 'Volt pro Zentimeter'],
    'Kilovolt par centimètre': ['Kilovolt per centimeter', 'Kilovoltio por centímetro', 'Kilovolt pro Zentimeter'],
    'Ampère par mètre carré': ['Ampere per square meter', 'Amperio por metro cuadrado', 'Ampere pro Quadratmeter'],
    'Milliampère par mètre carré': ['Milliampere per square meter', 'Miliamperio por metro cuadrado', 'Milliampere pro Quadratmeter'],
    'Ampère par centimètre carré': ['Ampere per square centimeter', 'Amperio por centímetro cuadrado', 'Ampere pro Quadratzentimeter'],
    'Milliampère par centimètre carré': ['Milliampere per square centimeter', 'Miliamperio por centímetro cuadrado', 'Milliampere pro Quadratzentimeter'],
    'Farad par mètre': ['Farad per meter', 'Faradio por metro', 'Farad pro Meter'],
    'Microfarad par mètre': ['Microfarad per meter', 'Microfaradio por metro', 'Mikrofarad pro Meter'],
    'Nanofarad par mètre': ['Nanofarad per meter', 'Nanofaradio por metro', 'Nanofarad pro Meter'],
    'Picofarad par mètre': ['Picofarad per meter', 'Picofaradio por metro', 'Picofarad pro Meter'],
    'Kilogramme par mole': ['Kilogram per mole', 'Kilogramo por mol', 'Kilogramm pro Mol'],
    'Gramme par mole': ['Gram per mole', 'Gramo por mol', 'Gramm pro Mol'],
    'Milligramme par mole': ['Milligram per mole', 'Miligramo por mol', 'Milligramm pro Mol'],
    'Gramme par millimole': ['Gram per millimole', 'Gramo por milimol', 'Gramm pro Millimol'],
    'Milligramme par millimole': ['Milligram per millimole', 'Miligramo por milimol', 'Milligramm pro Millimol'],
    'Mole par kilogramme': ['Mole per kilogram', 'Mol por kilogramo', 'Mol pro Kilogramm'],
    'Millimole par kilogramme': ['Millimole per kilogram', 'Milimol por kilogramo', 'Millimol pro Kilogramm'],
    'Micromole par kilogramme': ['Micromole per kilogram', 'Micromol por kilogramo', 'Mikromol pro Kilogramm'],
    'Nanomole par kilogramme': ['Nanomole per kilogram', 'Nanomol por kilogramo', 'Nanomol pro Kilogramm'],
    'Équivalent': ['Equivalent', 'Equivalente', 'Äquivalent'],
    'Milliéquivalent': ['Milliequivalent', 'Miliequivalente', 'Milliäquivalent'],
    'Microéquivalent': ['Microequivalent', 'Microequivalente', 'Mikroäquivalent'],
    'Nanoéquivalent': ['Nanoequivalent', 'Nanoequivalente', 'Nanoäquivalent'],
    'Osmole par litre': ['Osmole per liter', 'Osmol por litro', 'Osmol pro Liter'],
    'Milliosmole par litre': ['Milliosmole per liter', 'Miliosmol por litro', 'Milliosmol pro Liter'],
    'Micro-osmole par litre': ['Micro-osmole per liter', 'Microosmol por litro', 'Mikroosmol pro Liter'],
    'Osmole par mètre cube': ['Osmole per cubic meter', 'Osmol por metro cúbico', 'Osmol pro Kubikmeter'],
    'Osmole par kilogramme': ['Osmole per kilogram', 'Osmol por kilogramo', 'Osmol pro Kilogramm'],
    'Milliosmole par kilogramme': ['Milliosmole per kilogram', 'Miliosmol por kilogramo', 'Milliosmol pro Kilogramm'],
    'Micro-osmole par kilogramme': ['Micro-osmole per kilogram', 'Microosmol por kilogramo', 'Mikroosmol pro Kilogramm'],
    'Par mètre': ['Per meter', 'Por metro', 'Pro Meter'],
    'Par centimètre': ['Per centimeter', 'Por centímetro', 'Pro Zentimeter'],
    'Par millimètre': ['Per millimeter', 'Por milímetro', 'Pro Millimeter'],
    'Kayser': ['Kayser', 'Kayser', 'Kayser'],
    'Joule par kelvin': ['Joule per kelvin', 'Julio por kelvin', 'Joule pro Kelvin'],
    'Kilojoule par kelvin': ['Kilojoule per kelvin', 'Kilojulio por kelvin', 'Kilojoule pro Kelvin'],
    'Calorie par degré Celsius': ['Calorie per degree Celsius', 'Caloría por grado Celsius', 'Kalorie pro Grad Celsius'],
    'Kilocalorie par degré Celsius': ['Kilocalorie per degree Celsius', 'Kilocaloría por grado Celsius', 'Kilokalorie pro Grad Celsius'],
    'BTU par degré Fahrenheit': ['BTU per degree Fahrenheit', 'BTU por grado Fahrenheit', 'BTU pro Grad Fahrenheit'],
    'Coulomb par kilogramme': ['Coulomb per kilogram', 'Culombio por kilogramo', 'Coulomb pro Kilogramm'],
    'Millicoulomb par kilogramme': ['Millicoulomb per kilogram', 'Miliculombio por kilogramo', 'Millicoulomb pro Kilogramm'],
    'Microcoulomb par kilogramme': ['Microcoulomb per kilogram', 'Microculombio por kilogramo', 'Mikrocoulomb pro Kilogramm'],
    'Röntgen': ['Roentgen', 'Röntgen', 'Röntgen'],
    'Milliröntgen': ['Milliroentgen', 'Milirröntgen', 'Milliröntgen'],
    'Gray par seconde': ['Gray per second', 'Gray por segundo', 'Gray pro Sekunde'],
    'Gray par heure': ['Gray per hour', 'Gray por hora', 'Gray pro Stunde'],
    'Milligray par heure': ['Milligray per hour', 'Miligray por hora', 'Milligray pro Stunde'],
    'Microgray par heure': ['Microgray per hour', 'Microgray por hora', 'Mikrogray pro Stunde'],
    'Rad par heure': ['Rad per hour', 'Rad por hora', 'Rad pro Stunde'],
    'Sievert par seconde': ['Sievert per second', 'Sievert por segundo', 'Sievert pro Sekunde'],
    'Sievert par heure': ['Sievert per hour', 'Sievert por hora', 'Sievert pro Stunde'],
    'Millisievert par heure': ['Millisievert per hour', 'Milisievert por hora', 'Millisievert pro Stunde'],
    'Microsievert par heure': ['Microsievert per hour', 'Microsievert por hora', 'Mikrosievert pro Stunde'],
    'Rem par heure': ['Rem per hour', 'Rem por hora', 'Rem pro Stunde'],
    'Kilogramme par mètre cube': ['Kilogram per cubic meter', 'Kilogramo por metro cúbico', 'Kilogramm pro Kubikmeter'],
    'Milligramme par litre': ['Milligram per liter', 'Miligramo por litro', 'Milligramm pro Liter'],
    'Microgramme par litre': ['Microgram per liter', 'Microgramo por litro', 'Mikrogramm pro Liter'],
    'Nanogramme par litre': ['Nanogram per liter', 'Nanogramo por litro', 'Nanogramm pro Liter'],
    'Nanogramme par millilitre': ['Nanogram per milliliter', 'Nanogramo por mililitro', 'Nanogramm pro Milliliter'],
    'Pied d’arpentage américain': ['US survey foot', 'Pie topográfico estadounidense', 'US-Vermessungsfuß'],
    'Once troy': ['Troy ounce', 'Onza troy', 'Feinunze'],
    'Livre troy': ['Troy pound', 'Libra troy', 'Troy-Pfund'],
    'Pennyweight': ['Pennyweight', 'Pennyweight', 'Pennyweight'],
    'Scrupule apothicaire': ['Apothecaries scruple', 'Escrúpulo farmacéutico', 'Apotheker-Skrupel'],
    'Drachme apothicaire': ['Apothecaries dram', 'Dracma farmacéutica', 'Apotheker-Drachme'],
    'Millimètre d’eau': ['Millimeter of water', 'Milímetro de agua', 'Millimeter Wassersäule'],
    'Mètre d’eau': ['Meter of water', 'Metro de agua', 'Meter Wassersäule']
  };

  const CATALOG = {
    'Expression universelle': { en: 'Universal expression', es: 'Expresión universal', de: 'Universeller Ausdruck' },
    'SI + unités composées': { en: 'SI + compound units', es: 'SI + unidades compuestas', de: 'SI + zusammengesetzte Einheiten' },
    'Dimensions incompatibles': { en: 'Incompatible dimensions', es: 'Dimensiones incompatibles', de: 'Inkompatible Dimensionen' },
    'Expression non reconnue': { en: 'Unrecognized expression', es: 'Expresión no reconocida', de: 'Ausdruck nicht erkannt' },
    'Unités avancées (science, lumière, magnétisme, thermique…)': {
      en: 'Advanced units (science, light, magnetism, thermal…)',
      es: 'Unidades avanzadas (ciencia, luz, magnetismo, térmica…)',
      de: 'Erweiterte Einheiten (Wissenschaft, Licht, Magnetismus, Wärme…)'
    },
    'Valider': { en: 'Validate', es: 'Validar', de: 'Prüfen' },
    'Extension ultime pour convertir instantanément vos unités, devises et cryptomonnaies': {
      en: 'Ultimate extension to instantly convert units, currencies, and cryptocurrencies',
      es: 'Extensión definitiva para convertir al instante unidades, divisas y criptomonedas',
      de: 'Ultimative Erweiterung zum sofortigen Umrechnen von Einheiten, Währungen und Kryptowährungen'
    },
    'Hub Converter — Paramètres': {
      en: 'Hub Converter - Settings',
      es: 'Hub Converter - Ajustes',
      de: 'Hub Converter - Einstellungen'
    },
    'Paramètres de l\'extension': {
      en: 'Extension settings',
      es: 'Ajustes de la extensión',
      de: 'Erweiterungseinstellungen'
    },
    'Version': { en: 'Version', es: 'Versión', de: 'Version' },
    'Navigation des paramètres': { en: 'Settings navigation', es: 'Navegación de ajustes', de: 'Einstellungsnavigation' },
    'Général': { en: 'General', es: 'General', de: 'Allgemein' },
    'Animations': { en: 'Animations', es: 'Animaciones', de: 'Animationen' },
    'Widget': { en: 'Widget', es: 'Widget', de: 'Widget' },
    'Taux de change': { en: 'Exchange rates', es: 'Tipos de cambio', de: 'Wechselkurse' },
    'Historique': { en: 'History', es: 'Historial', de: 'Verlauf' },
    'Avancé': { en: 'Advanced', es: 'Avanzado', de: 'Erweitert' },
    'Réinitialiser tous les paramètres': {
      en: 'Reset all settings',
      es: 'Restablecer todos los ajustes',
      de: 'Alle Einstellungen zurücksetzen'
    },
    'Paramètres généraux': { en: 'General settings', es: 'Ajustes generales', de: 'Allgemeine Einstellungen' },
    'Apparence': { en: 'Appearance', es: 'Apariencia', de: 'Darstellung' },
    'Mode clair/sombre et style visuel global de l\'extension.': {
      en: 'Light/dark mode and global visual style for the extension.',
      es: 'Modo claro/oscuro y estilo visual global de la extensión.',
      de: 'Hell-/Dunkelmodus und globaler visueller Stil der Erweiterung.'
    },
    'Mode d\'affichage': { en: 'Display mode', es: 'Modo de visualización', de: 'Anzeigemodus' },
    'Contrôle le toggle clair/sombre et la lisibilité générale': {
      en: 'Controls the light/dark toggle and overall readability',
      es: 'Controla el cambio claro/oscuro y la legibilidad general',
      de: 'Steuert den Hell-/Dunkelwechsel und die allgemeine Lesbarkeit'
    },
    'Sombre': { en: 'Dark', es: 'Oscuro', de: 'Dunkel' },
    'Clair': { en: 'Light', es: 'Claro', de: 'Hell' },
    'Automatique': { en: 'Automatic', es: 'Automático', de: 'Automatisch' },
    'Style visuel': { en: 'Visual style', es: 'Estilo visual', de: 'Visueller Stil' },
    'Choisissez une ambiance, indépendante du mode clair/sombre': {
      en: 'Choose a mood, independent from light/dark mode',
      es: 'Elige una ambientación independiente del modo claro/oscuro',
      de: 'Wähle eine Stimmung, unabhängig vom Hell-/Dunkelmodus'
    },
    'Standards (sans dégradé)': { en: 'Standards (no gradient)', es: 'Estándar (sin degradado)', de: 'Standards (ohne Verlauf)' },
    'Colorés': { en: 'Colorful', es: 'Coloridos', de: 'Farbig' },
    'Océan': { en: 'Ocean', es: 'Océano', de: 'Ozean' },
    'Forêt': { en: 'Forest', es: 'Bosque', de: 'Wald' },
    'Personnalisé': { en: 'Custom', es: 'Personalizado', de: 'Benutzerdefiniert' },
    'Galerie de thèmes': { en: 'Theme gallery', es: 'Galería de temas', de: 'Themengalerie' },
    'Aperçu rapide des préréglages disponibles': {
      en: 'Quick preview of available presets',
      es: 'Vista rápida de los preajustes disponibles',
      de: 'Schnellvorschau der verfügbaren Vorgaben'
    },
    'Thèmes disponibles': { en: 'Available themes', es: 'Temas disponibles', de: 'Verfügbare Themen' },
    'Éditeur de thème personnalisé': {
      en: 'Custom theme editor',
      es: 'Editor de tema personalizado',
      de: 'Editor für benutzerdefinierte Designs'
    },
    'couleurs, dégradés, profondeur': { en: 'colors, gradients, depth', es: 'colores, degradados, profundidad', de: 'Farben, Verläufe, Tiefe' },
    'Définissez vos propres couleurs, angles de dégradé et arrondis. Les modifications sont appliquées en direct et synchronisées avec le popup et le widget.': {
      en: 'Set your own colors, gradient angles, and radii. Changes are applied live and synced with the popup and widget.',
      es: 'Define tus propios colores, ángulos de degradado y radios. Los cambios se aplican en directo y se sincronizan con el popup y el widget.',
      de: 'Lege eigene Farben, Verlaufswinkel und Rundungen fest. Änderungen werden live angewendet und mit Popup und Widget synchronisiert.'
    },
    'Aperçu de l\'extension': { en: 'Extension preview', es: 'Vista previa de la extensión', de: 'Vorschau der Erweiterung' },
    'Contraste OK': { en: 'Contrast OK', es: 'Contraste correcto', de: 'Kontrast OK' },
    'Mode d\'aperçu': { en: 'Preview mode', es: 'Modo de vista previa', de: 'Vorschaumodus' },
    'Aperçu réel du popup Hub Converter': {
      en: 'Real Hub Converter popup preview',
      es: 'Vista previa real del popup de Hub Converter',
      de: 'Echte Vorschau des Hub Converter-Popups'
    },
    'Couleur principale': { en: 'Primary color', es: 'Color principal', de: 'Primärfarbe' },
    'Boutons, icône de marque': { en: 'Buttons, brand icon', es: 'Botones, icono de marca', de: 'Buttons, Markenicon' },
    'Choisir la couleur principale': { en: 'Choose the primary color', es: 'Elegir el color principal', de: 'Primärfarbe auswählen' },
    'Code hexadécimal couleur principale': { en: 'Primary color hex code', es: 'Código hexadecimal del color principal', de: 'Hexcode der Primärfarbe' },
    'Couleur secondaire': { en: 'Secondary color', es: 'Color secundario', de: 'Sekundärfarbe' },
    'Gradient, accents doux': { en: 'Gradient, soft accents', es: 'Degradado, acentos suaves', de: 'Verlauf, weiche Akzente' },
    'Choisir la couleur secondaire': { en: 'Choose the secondary color', es: 'Elegir el color secundario', de: 'Sekundärfarbe auswählen' },
    'Code hexadécimal couleur secondaire': { en: 'Secondary color hex code', es: 'Código hexadecimal del color secundario', de: 'Hexcode der Sekundärfarbe' },
    'Couleur d\'accent': { en: 'Accent color', es: 'Color de acento', de: 'Akzentfarbe' },
    'Éclats, détails chauds': { en: 'Highlights, warm details', es: 'Destellos, detalles cálidos', de: 'Highlights, warme Details' },
    'Choisir la couleur d\'accent': { en: 'Choose the accent color', es: 'Elegir el color de acento', de: 'Akzentfarbe auswählen' },
    'Code hexadécimal couleur d\'accent': { en: 'Accent color hex code', es: 'Código hexadecimal del color de acento', de: 'Hexcode der Akzentfarbe' },
    'Dégradé des boutons': { en: 'Button gradient', es: 'Degradado de botones', de: 'Button-Verlauf' },
    'Orientation (0°–360°)': { en: 'Orientation (0°-360°)', es: 'Orientación (0°-360°)', de: 'Ausrichtung (0°-360°)' },
    'Dégradé de fond': { en: 'Background gradient', es: 'Degradado de fondo', de: 'Hintergrundverlauf' },
    'Arrière-plan du popup': { en: 'Popup background', es: 'Fondo del popup', de: 'Popup-Hintergrund' },
    'Arrondi des angles': { en: 'Corner radius', es: 'Radio de las esquinas', de: 'Eckenradius' },
    'Valeur de 0 à 20 px': { en: 'Value from 0 to 20 px', es: 'Valor de 0 a 20 px', de: 'Wert von 0 bis 20 px' },
    'Profondeur des cartes': { en: 'Card depth', es: 'Profundidad de tarjetas', de: 'Kartentiefe' },
    'Intensité des ombres': { en: 'Shadow intensity', es: 'Intensidad de sombras', de: 'Schattenintensität' },
    'Plat': { en: 'Flat', es: 'Plano', de: 'Flach' },
    'Standard': { en: 'Standard', es: 'Estándar', de: 'Standard' },
    'Profond': { en: 'Deep', es: 'Profundo', de: 'Tief' },
    'Arrière-plans': { en: 'Backgrounds', es: 'Fondos', de: 'Hintergründe' },
    'Clair et sombre': { en: 'Light and dark', es: 'Claro y oscuro', de: 'Hell und dunkel' },
    'Mode sombre': { en: 'Dark mode', es: 'Modo oscuro', de: 'Dunkelmodus' },
    'Couleur de fond mode sombre': { en: 'Dark mode background color', es: 'Color de fondo del modo oscuro', de: 'Hintergrundfarbe im Dunkelmodus' },
    'Mode clair': { en: 'Light mode', es: 'Modo claro', de: 'Hellmodus' },
    'Couleur de fond mode clair': { en: 'Light mode background color', es: 'Color de fondo del modo claro', de: 'Hintergrundfarbe im Hellmodus' },
    'Charger un preset': { en: 'Load a preset', es: 'Cargar un preset', de: 'Vorgabe laden' },
    'Aléatoire': { en: 'Random', es: 'Aleatorio', de: 'Zufällig' },
    'Exporter JSON': { en: 'Export JSON', es: 'Exportar JSON', de: 'JSON exportieren' },
    'Importer JSON': { en: 'Import JSON', es: 'Importar JSON', de: 'JSON importieren' },
    'Réinitialiser': { en: 'Reset', es: 'Restablecer', de: 'Zurücksetzen' },
    'Format des résultats': { en: 'Result format', es: 'Formato de resultados', de: 'Ergebnisformat' },
    'Précision numérique et alignement de la valeur convertie.': {
      en: 'Numeric precision and alignment of the converted value.',
      es: 'Precisión numérica y alineación del valor convertido.',
      de: 'Numerische Genauigkeit und Ausrichtung des umgerechneten Werts.'
    },
    'Précision': { en: 'Precision', es: 'Precisión', de: 'Genauigkeit' },
    'Nombre de décimales à afficher': { en: 'Number of decimals to display', es: 'Número de decimales que mostrar', de: 'Anzahl der anzuzeigenden Dezimalstellen' },
    'Entier': { en: 'Integer', es: 'Entero', de: 'Ganzzahl' },
    '1 décimale': { en: '1 decimal', es: '1 decimal', de: '1 Dezimalstelle' },
    '2 décimales': { en: '2 decimals', es: '2 decimales', de: '2 Dezimalstellen' },
    '4 décimales': { en: '4 decimals', es: '4 decimales', de: '4 Dezimalstellen' },
    '6 décimales': { en: '6 decimals', es: '6 decimales', de: '6 Dezimalstellen' },
    'Alignement': { en: 'Alignment', es: 'Alineación', de: 'Ausrichtung' },
    'Position de la valeur convertie dans la carte de résultat': {
      en: 'Position of the converted value in the result card',
      es: 'Posición del valor convertido en la tarjeta de resultado',
      de: 'Position des umgerechneten Werts in der Ergebniskarte'
    },
    'Aligné à gauche': { en: 'Left aligned', es: 'Alineado a la izquierda', de: 'Linksbündig' },
    'Centré': { en: 'Centered', es: 'Centrado', de: 'Zentriert' },
    'Aligné à droite': { en: 'Right aligned', es: 'Alineado a la derecha', de: 'Rechtsbündig' },
    'Langue': { en: 'Language', es: 'Idioma', de: 'Sprache' },
    'Langue d\'affichage de l\'interface.': {
      en: 'Interface display language.',
      es: 'Idioma de visualización de la interfaz.',
      de: 'Anzeigesprache der Oberfläche.'
    },
    'Langue de l\'interface': { en: 'Interface language', es: 'Idioma de la interfaz', de: 'Sprache der Oberfläche' },
    'S\'applique au popup, au widget et à cette page': {
      en: 'Applies to the popup, widget, and this page',
      es: 'Se aplica al popup, al widget y a esta página',
      de: 'Gilt für Popup, Widget und diese Seite'
    },
    'Français': { en: 'French', es: 'Francés', de: 'Französisch' },
    'English': { en: 'English', es: 'Inglés', de: 'Englisch' },
    'Español': { en: 'Spanish', es: 'Español', de: 'Spanisch' },
    'Deutsch': { en: 'German', es: 'Alemán', de: 'Deutsch' },
    'Animations & effets': { en: 'Animations & effects', es: 'Animaciones y efectos', de: 'Animationen & Effekte' },
    'Activation et préréglage': { en: 'Activation and preset', es: 'Activación y preajuste', de: 'Aktivierung und Vorgabe' },
    'Désactivez tout en un clic, ou choisissez une ambiance globale.': {
      en: 'Turn everything off in one click, or choose a global mood.',
      es: 'Desactiva todo con un clic o elige una ambientación global.',
      de: 'Alles mit einem Klick deaktivieren oder eine globale Stimmung wählen.'
    },
    'Activer les animations': { en: 'Enable animations', es: 'Activar animaciones', de: 'Animationen aktivieren' },
    'Désactive tout mouvement et effet lumineux si décoché': {
      en: 'Disables all movement and glow effects when unchecked',
      es: 'Desactiva todo movimiento y efecto luminoso si no está marcado',
      de: 'Deaktiviert alle Bewegungen und Leuchteffekte, wenn abgewählt'
    },
    'Préréglage': { en: 'Preset', es: 'Preajuste', de: 'Vorgabe' },
    'Choisissez une ambiance globale ou personnalisez au-dessous': {
      en: 'Choose a global mood or customize below',
      es: 'Elige una ambientación global o personaliza abajo',
      de: 'Wähle eine globale Stimmung oder passe unten an'
    },
    'Préréglages d\'animations': { en: 'Animation presets', es: 'Preajustes de animación', de: 'Animationsvorgaben' },
    'Sobre': { en: 'Subtle', es: 'Sobrio', de: 'Dezent' },
    'Minimal, reposant': { en: 'Minimal, calm', es: 'Minimalista, relajado', de: 'Minimal, ruhig' },
    'Équilibré': { en: 'Balanced', es: 'Equilibrado', de: 'Ausgewogen' },
    'Dynamique mais discret': { en: 'Dynamic but discreet', es: 'Dinámico pero discreto', de: 'Dynamisch, aber dezent' },
    'Expressif': { en: 'Expressive', es: 'Expresivo', de: 'Expressiv' },
    'Plus vif, plus vivant': { en: 'Brighter, livelier', es: 'Más vivo, más dinámico', de: 'Lebendiger und aktiver' },
    'Vos choix ci-dessous': { en: 'Your choices below', es: 'Tus opciones abajo', de: 'Deine Auswahl unten' },
    'Bouton inverser': { en: 'Swap button', es: 'Botón de intercambio', de: 'Tauschen-Button' },
    'Effet déclenché à chaque échange « De ↔ Vers ».': {
      en: 'Effect triggered on each "From ↔ To" swap.',
      es: 'Efecto activado en cada intercambio "De ↔ A".',
      de: 'Effekt, der bei jedem Tausch "Von ↔ Nach" ausgelöst wird.'
    },
    'Style d\'animation': { en: 'Animation style', es: 'Estilo de animación', de: 'Animationsstil' },
    'Survolez une vignette pour la prévisualiser': {
      en: 'Hover over a tile to preview it',
      es: 'Pasa el cursor por una tarjeta para previsualizarla',
      de: 'Bewege den Mauszeiger über eine Kachel, um sie anzusehen'
    },
    'Style du bouton inverser': { en: 'Swap button style', es: 'Estilo del botón de intercambio', de: 'Stil des Tauschen-Buttons' },
    'Rotation': { en: 'Rotation', es: 'Rotación', de: 'Drehung' },
    'Retournement': { en: 'Flip', es: 'Volteo', de: 'Umdrehen' },
    'Rebond': { en: 'Bounce', es: 'Rebote', de: 'Sprung' },
    'Pulsation': { en: 'Pulse', es: 'Pulsación', de: 'Pulsieren' },
    'Onde': { en: 'Wave', es: 'Onda', de: 'Welle' },
    'Intensité': { en: 'Intensity', es: 'Intensidad', de: 'Intensität' },
    '0 % = minimal, 200 % = très prononcé': {
      en: '0% = minimal, 200% = very pronounced',
      es: '0 % = mínimo, 200 % = muy marcado',
      de: '0 % = minimal, 200 % = sehr ausgeprägt'
    },
    'Effets individuels': { en: 'Individual effects', es: 'Efectos individuales', de: 'Einzeleffekte' },
    'activer ou désactiver chaque effet': { en: 'enable or disable each effect', es: 'activar o desactivar cada efecto', de: 'jeden Effekt aktivieren oder deaktivieren' },
    'Décor d\'arrière-plan': { en: 'Background decor', es: 'Decoración de fondo', de: 'Hintergrunddekor' },
    'Orbes ambiants': { en: 'Ambient orbs', es: 'Orbes ambientales', de: 'Ambient-Orbs' },
    'Halos lents en arrière-plan': { en: 'Slow halos in the background', es: 'Halos lentos en el fondo', de: 'Langsame Halos im Hintergrund' },
    'Particules': { en: 'Particles', es: 'Partículas', de: 'Partikel' },
    'Points flottants subtils': { en: 'Subtle floating dots', es: 'Puntos flotantes sutiles', de: 'Dezente schwebende Punkte' },
    'Spot curseur': { en: 'Cursor spotlight', es: 'Foco del cursor', de: 'Cursor-Spotlight' },
    'Lueur qui suit la souris': { en: 'Glow that follows the mouse', es: 'Luz que sigue al ratón', de: 'Leuchten, das der Maus folgt' },
    'Aurore d\'en-tête': { en: 'Header aurora', es: 'Aurora de encabezado', de: 'Kopfzeilen-Aurora' },
    'Dégradé animé du header': { en: 'Animated header gradient', es: 'Degradado animado del encabezado', de: 'Animierter Kopfzeilenverlauf' },
    'Réactions visuelles': { en: 'Visual reactions', es: 'Reacciones visuales', de: 'Visuelle Reaktionen' },
    'Pulse du résultat': { en: 'Result pulse', es: 'Pulso del resultado', de: 'Ergebnisimpuls' },
    'Flash léger à chaque calcul': { en: 'Light flash on each calculation', es: 'Destello ligero en cada cálculo', de: 'Leichter Blitz bei jeder Berechnung' },
    'Reflet des boutons': { en: 'Button sheen', es: 'Brillo de botones', de: 'Button-Schimmer' },
    'Traînée brillante au survol': { en: 'Bright streak on hover', es: 'Estela brillante al pasar el cursor', de: 'Glänzende Spur beim Hover' },
    'Halo de statut': { en: 'Status halo', es: 'Halo de estado', de: 'Status-Halo' },
    'Respiration du point d\'état': { en: 'Breathing status dot', es: 'Respiración del punto de estado', de: 'Atmender Statuspunkt' },
    'Lueur des champs': { en: 'Field glow', es: 'Brillo de campos', de: 'Feldleuchten' },
    'Halo autour des saisies actives': { en: 'Halo around active inputs', es: 'Halo alrededor de entradas activas', de: 'Halo um aktive Eingaben' },
    'Mouvement d\'objets': { en: 'Object movement', es: 'Movimiento de objetos', de: 'Objektbewegung' },
    'Flottement des icônes': { en: 'Icon float', es: 'Flotación de iconos', de: 'Icon-Schweben' },
    'Icônes de catégorie qui respirent': { en: 'Breathing category icons', es: 'Iconos de categoría que respiran', de: 'Atmende Kategorie-Icons' },
    'Logo pulsant': { en: 'Pulsing logo', es: 'Logo pulsante', de: 'Pulsierendes Logo' },
    'Légère vibration du logo': { en: 'Light logo vibration', es: 'Ligera vibración del logo', de: 'Leichte Logo-Vibration' },
    'Pulse du widget': { en: 'Widget pulse', es: 'Pulso del widget', de: 'Widget-Impuls' },
    'Boucle continue, période réglable': { en: 'Continuous loop, adjustable period', es: 'Bucle continuo, periodo ajustable', de: 'Endlosschleife, einstellbare Dauer' },
    'Animation du bouton inverser': { en: 'Swap button animation', es: 'Animación del botón de intercambio', de: 'Animation des Tauschen-Buttons' },
    'Effet au clic d\'échange': { en: 'Effect on swap click', es: 'Efecto al hacer clic para intercambiar', de: 'Effekt beim Tauschen-Klick' },
    'Réglages fins': { en: 'Fine tuning', es: 'Ajustes finos', de: 'Feinabstimmung' },
    'vitesse, particules, lueur': { en: 'speed, particles, glow', es: 'velocidad, partículas, brillo', de: 'Geschwindigkeit, Partikel, Leuchten' },
    'Vitesse globale': { en: 'Global speed', es: 'Velocidad global', de: 'Globale Geschwindigkeit' },
    'Accélère ou ralentit toutes les animations (0,25× – 2,5×)': {
      en: 'Speeds up or slows down all animations (0.25x - 2.5x)',
      es: 'Acelera o ralentiza todas las animaciones (0,25× - 2,5×)',
      de: 'Beschleunigt oder verlangsamt alle Animationen (0,25× - 2,5×)'
    },
    'Quantité de particules': { en: 'Particle amount', es: 'Cantidad de partículas', de: 'Partikelanzahl' },
    'Nombre de particules affichées (0–12)': {
      en: 'Number of displayed particles (0-12)',
      es: 'Número de partículas mostradas (0-12)',
      de: 'Anzahl angezeigter Partikel (0-12)'
    },
    'Intensité des lueurs': { en: 'Glow intensity', es: 'Intensidad de brillo', de: 'Leuchtintensität' },
    'Opacité/étendue des halos (0 %–200 %)': {
      en: 'Halo opacity/spread (0%-200%)',
      es: 'Opacidad/alcance de halos (0 %-200 %)',
      de: 'Halo-Deckkraft/-Ausdehnung (0 %-200 %)'
    },
    'Périodes des animations continues': { en: 'Continuous animation periods', es: 'Periodos de animaciones continuas', de: 'Perioden kontinuierlicher Animationen' },
    'durée d\'un cycle de chaque effet en boucle': {
      en: 'duration of one cycle for each looping effect',
      es: 'duración de un ciclo de cada efecto en bucle',
      de: 'Dauer eines Zyklus jedes Schleifeneffekts'
    },
    'Cycle de pulsation continue du widget (0,8 s – 12 s)': {
      en: 'Continuous widget pulse cycle (0.8s - 12s)',
      es: 'Ciclo de pulso continuo del widget (0,8 s - 12 s)',
      de: 'Kontinuierlicher Widget-Impulszyklus (0,8 s - 12 s)'
    },
    'Pulse du logo': { en: 'Logo pulse', es: 'Pulso del logo', de: 'Logo-Impuls' },
    'Cycle de respiration du logo (0,8 s – 12 s)': {
      en: 'Logo breathing cycle (0.8s - 12s)',
      es: 'Ciclo de respiración del logo (0,8 s - 12 s)',
      de: 'Atemzyklus des Logos (0,8 s - 12 s)'
    },
    'Cycle d\'expansion du halo (0,8 s – 12 s)': {
      en: 'Halo expansion cycle (0.8s - 12s)',
      es: 'Ciclo de expansión del halo (0,8 s - 12 s)',
      de: 'Ausdehnungszyklus des Halos (0,8 s - 12 s)'
    },
    'Flottement icône catégorie': { en: 'Category icon float', es: 'Flotación del icono de categoría', de: 'Schweben des Kategorie-Icons' },
    'Cycle de balancement vertical (0,8 s – 12 s)': {
      en: 'Vertical bobbing cycle (0.8s - 12s)',
      es: 'Ciclo de balanceo vertical (0,8 s - 12 s)',
      de: 'Vertikaler Schwingungszyklus (0,8 s - 12 s)'
    },
    'Réinitialiser les animations': { en: 'Reset animations', es: 'Restablecer animaciones', de: 'Animationen zurücksetzen' },
    'Remet les valeurs du préréglage « Équilibré »': {
      en: 'Restores the "Balanced" preset values',
      es: 'Restaura los valores del preajuste "Equilibrado"',
      de: 'Stellt die Werte der Vorgabe "Ausgewogen" wieder her'
    },
    'Widget de conversion': { en: 'Conversion widget', es: 'Widget de conversión', de: 'Umrechnungs-Widget' },
    'Comportement': { en: 'Behavior', es: 'Comportamiento', de: 'Verhalten' },
    'Apparition du widget lors d\'une sélection de texte sur les pages.': {
      en: 'Widget appearance when text is selected on pages.',
      es: 'Aparición del widget al seleccionar texto en las páginas.',
      de: 'Anzeige des Widgets beim Auswählen von Text auf Seiten.'
    },
    'Activer le widget': { en: 'Enable widget', es: 'Activar widget', de: 'Widget aktivieren' },
    'Afficher le widget lors de la sélection de texte': {
      en: 'Show the widget when text is selected',
      es: 'Mostrar el widget al seleccionar texto',
      de: 'Widget beim Auswählen von Text anzeigen'
    },
    'Délai d\'apparition': { en: 'Appearance delay', es: 'Retraso de aparición', de: 'Anzeigedauer' },
    'Temps avant l\'affichage du widget (ms)': {
      en: 'Time before the widget appears (ms)',
      es: 'Tiempo antes de mostrar el widget (ms)',
      de: 'Zeit bis zur Widget-Anzeige (ms)'
    },
    'Position': { en: 'Position', es: 'Posición', de: 'Position' },
    'Emplacement d\'affichage par défaut': { en: 'Default display location', es: 'Ubicación de visualización predeterminada', de: 'Standardposition der Anzeige' },
    'En dessous de la sélection': { en: 'Below the selection', es: 'Debajo de la selección', de: 'Unter der Auswahl' },
    'Au dessus de la sélection': { en: 'Above the selection', es: 'Encima de la selección', de: 'Über der Auswahl' },
    'Près du curseur': { en: 'Near the cursor', es: 'Cerca del cursor', de: 'In der Nähe des Cursors' },
    'Détection automatique': { en: 'Automatic detection', es: 'Detección automática', de: 'Automatische Erkennung' },
    'Toutes les catégories · 25 activées': { en: 'All categories · 25 enabled', es: 'Todas las categorías · 25 activadas', de: 'Alle Kategorien · 25 aktiviert' },
    'Aucune catégorie activée': { en: 'No category enabled', es: 'Ninguna categoría activada', de: 'Keine Kategorie aktiviert' },
    'Catégories reconnues': { en: 'Recognized categories', es: 'Categorías reconocidas', de: 'Erkannte Kategorien' },
    'Désactivez uniquement les catégories qui provoquent des détections inutiles.': {
      en: 'Disable only categories that cause unwanted detections.',
      es: 'Desactiva solo las categorías que provoquen detecciones innecesarias.',
      de: 'Deaktivieren Sie nur Kategorien, die unerwünschte Erkennungen verursachen.'
    },
    'Tout activer': { en: 'Enable all', es: 'Activar todo', de: 'Alle aktivieren' },
    'types de valeurs reconnus dans le texte sélectionné': {
      en: 'value types recognized in selected text',
      es: 'tipos de valores reconocidos en el texto seleccionado',
      de: 'Werttypen, die im ausgewählten Text erkannt werden'
    },
    'Distances & espace': { en: 'Distances & space', es: 'Distancias y espacio', de: 'Entfernungen & Raum' },
    'Longueurs (km, m, mi, ft…)': { en: 'Lengths (km, m, mi, ft...)', es: 'Longitudes (km, m, mi, ft...)', de: 'Längen (km, m, mi, ft...)' },
    'Surfaces (m², ft², ha…)': { en: 'Areas (m², ft², ha...)', es: 'Superficies (m², ft², ha...)', de: 'Flächen (m², ft², ha...)' },
    'Volumes (L, mL, gal…)': { en: 'Volumes (L, mL, gal...)', es: 'Volúmenes (L, mL, gal...)', de: 'Volumen (L, mL, gal...)' },
    'Vitesses (km/h, mph…)': { en: 'Speeds (km/h, mph...)', es: 'Velocidades (km/h, mph...)', de: 'Geschwindigkeiten (km/h, mph...)' },
    'Angles (°, rad, tours…)': { en: 'Angles (°, rad, turns...)', es: 'Ángulos (°, rad, vueltas...)', de: 'Winkel (°, rad, Umdrehungen...)' },
    'Masse & physique': { en: 'Mass & physics', es: 'Masa y física', de: 'Masse & Physik' },
    'Masses (kg, g, lb, oz…)': { en: 'Masses (kg, g, lb, oz...)', es: 'Masas (kg, g, lb, oz...)', de: 'Massen (kg, g, lb, oz...)' },
    'Températures (°C, °F, K)': { en: 'Temperatures (°C, °F, K)', es: 'Temperaturas (°C, °F, K)', de: 'Temperaturen (°C, °F, K)' },
    'Pressions (Pa, bar, psi…)': { en: 'Pressures (Pa, bar, psi...)', es: 'Presiones (Pa, bar, psi...)', de: 'Druckwerte (Pa, bar, psi...)' },
    'Forces (N, kgf, lbf…)': { en: 'Forces (N, kgf, lbf...)', es: 'Fuerzas (N, kgf, lbf...)', de: 'Kräfte (N, kgf, lbf...)' },
    'Densités (kg/m³, g/cm³…)': { en: 'Densities (kg/m³, g/cm³...)', es: 'Densidades (kg/m³, g/cm³...)', de: 'Dichten (kg/m³, g/cm³...)' },
    'Couples (N·m, lbf·ft…)': { en: 'Torques (N·m, lbf·ft...)', es: 'Pares (N·m, lbf·ft...)', de: 'Drehmomente (N·m, lbf·ft...)' },
    'Énergie & électricité': { en: 'Energy & electricity', es: 'Energía y electricidad', de: 'Energie & Elektrizität' },
    'Énergies (J, kWh, kcal…)': { en: 'Energies (J, kWh, kcal...)', es: 'Energías (J, kWh, kcal...)', de: 'Energien (J, kWh, kcal...)' },
    'Puissances (W, kW, hp…)': { en: 'Powers (W, kW, hp...)', es: 'Potencias (W, kW, hp...)', de: 'Leistungen (W, kW, hp...)' },
    'Fréquences (Hz, MHz, rpm…)': { en: 'Frequencies (Hz, MHz, rpm...)', es: 'Frecuencias (Hz, MHz, rpm...)', de: 'Frequenzen (Hz, MHz, rpm...)' },
    'Courants (A, mA, kA…)': { en: 'Currents (A, mA, kA...)', es: 'Corrientes (A, mA, kA...)', de: 'Ströme (A, mA, kA...)' },
    'Tensions (V, mV, kV…)': { en: 'Voltages (V, mV, kV...)', es: 'Tensiones (V, mV, kV...)', de: 'Spannungen (V, mV, kV...)' },
    'Résistances (Ω, kΩ, MΩ…)': { en: 'Resistances (Ω, kΩ, MΩ...)', es: 'Resistencias (Ω, kΩ, MΩ...)', de: 'Widerstände (Ω, kΩ, MΩ...)' },
    'Charges (C, Ah, mAh…)': { en: 'Charges (C, Ah, mAh...)', es: 'Cargas (C, Ah, mAh...)', de: 'Ladungen (C, Ah, mAh...)' },
    'Devises, temps & données': { en: 'Currencies, time & data', es: 'Divisas, tiempo y datos', de: 'Währungen, Zeit & Daten' },
    'Devises (€, $, £, ¥…)': { en: 'Currencies (€, $, £, ¥...)', es: 'Divisas (€, $, £, ¥...)', de: 'Währungen (€, $, £, ¥...)' },
    'Cryptomonnaies (BTC, ETH…)': { en: 'Cryptocurrencies (BTC, ETH...)', es: 'Criptomonedas (BTC, ETH...)', de: 'Kryptowährungen (BTC, ETH...)' },
    'Temps (ms, min, h, jours…)': { en: 'Time (ms, min, h, days...)', es: 'Tiempo (ms, min, h, días...)', de: 'Zeit (ms, min, h, Tage...)' },
    'Données (bits, MB, GiB…)': { en: 'Data (bits, MB, GiB...)', es: 'Datos (bits, MB, GiB...)', de: 'Daten (bits, MB, GiB...)' },
    'Carburant (L/100km, mpg…)': { en: 'Fuel (L/100km, mpg...)', es: 'Combustible (L/100km, mpg...)', de: 'Kraftstoff (L/100km, mpg...)' },
    'Débits (L/min, m³/h…)': { en: 'Flow rates (L/min, m³/h...)', es: 'Caudales (L/min, m³/h...)', de: 'Durchflussraten (L/min, m³/h...)' },
    'Mise à jour': { en: 'Update', es: 'Actualización', de: 'Aktualisierung' },
    'Fréquence de rafraîchissement et devise de référence.': {
      en: 'Refresh frequency and reference currency.',
      es: 'Frecuencia de actualización y divisa de referencia.',
      de: 'Aktualisierungsfrequenz und Referenzwährung.'
    },
    'Mise à jour automatique': { en: 'Automatic update', es: 'Actualización automática', de: 'Automatische Aktualisierung' },
    'Actualiser les taux périodiquement': { en: 'Refresh rates periodically', es: 'Actualizar tipos periódicamente', de: 'Kurse regelmäßig aktualisieren' },
    'Fréquence': { en: 'Frequency', es: 'Frecuencia', de: 'Frequenz' },
    'Intervalle entre les mises à jour': { en: 'Interval between updates', es: 'Intervalo entre actualizaciones', de: 'Intervall zwischen Aktualisierungen' },
    '5 minutes': { en: '5 minutes', es: '5 minutos', de: '5 Minuten' },
    '10 minutes': { en: '10 minutes', es: '10 minutos', de: '10 Minuten' },
    '15 minutes': { en: '15 minutes', es: '15 minutos', de: '15 Minuten' },
    '30 minutes': { en: '30 minutes', es: '30 minutos', de: '30 Minuten' },
    '1 heure': { en: '1 hour', es: '1 hora', de: '1 Stunde' },
    '2 heures': { en: '2 hours', es: '2 horas', de: '2 Stunden' },
    '6 heures': { en: '6 hours', es: '6 horas', de: '6 Stunden' },
    'Devise de référence': { en: 'Reference currency', es: 'Divisa de referencia', de: 'Referenzwährung' },
    'Devise utilisée comme base de conversion': {
      en: 'Currency used as the conversion base',
      es: 'Divisa utilizada como base de conversión',
      de: 'Währung, die als Umrechnungsbasis verwendet wird'
    },
    'Cryptomonnaies': { en: 'Cryptocurrencies', es: 'Criptomonedas', de: 'Kryptowährungen' },
    'Inclure les conversions de cryptomonnaies': {
      en: 'Include cryptocurrency conversions',
      es: 'Incluir conversiones de criptomonedas',
      de: 'Kryptowährungsumrechnungen einschließen'
    },
    'État des taux': { en: 'Rate status', es: 'Estado de tipos', de: 'Kursstatus' },
    'Dernière mise à jour des données distantes.': {
      en: 'Latest update of remote data.',
      es: 'Última actualización de los datos remotos.',
      de: 'Letzte Aktualisierung der entfernten Daten.'
    },
    'Statut': { en: 'Status', es: 'Estado', de: 'Status' },
    'Devises et cryptomonnaies': { en: 'Currencies and cryptocurrencies', es: 'Divisas y criptomonedas', de: 'Währungen und Kryptowährungen' },
    'Devises:': { en: 'Currencies:', es: 'Divisas:', de: 'Währungen:' },
    'Crypto:': { en: 'Crypto:', es: 'Cripto:', de: 'Krypto:' },
    'Chargement...': { en: 'Loading...', es: 'Cargando...', de: 'Laden...' },
    'Mettre à jour maintenant': { en: 'Update now', es: 'Actualizar ahora', de: 'Jetzt aktualisieren' },
    'Préférences': { en: 'Preferences', es: 'Preferencias', de: 'Einstellungen' },
    'Activation et limites de l\'historique des conversions.': {
      en: 'Activation and limits for conversion history.',
      es: 'Activación y límites del historial de conversiones.',
      de: 'Aktivierung und Grenzen des Umrechnungsverlaufs.'
    },
    'Activer l\'historique': { en: 'Enable history', es: 'Activar historial', de: 'Verlauf aktivieren' },
    'Enregistrer les conversions effectuées': {
      en: 'Save completed conversions',
      es: 'Guardar las conversiones realizadas',
      de: 'Durchgeführte Umrechnungen speichern'
    },
    'Nombre d\'entrées max': { en: 'Max entries', es: 'Entradas máximas', de: 'Maximale Einträge' },
    'Limite de l\'historique (0 = illimité)': {
      en: 'History limit (0 = unlimited)',
      es: 'Límite del historial (0 = ilimitado)',
      de: 'Verlaufslimit (0 = unbegrenzt)'
    },
    'Affichage dans le popup': { en: 'Display in popup', es: 'Mostrar en el popup', de: 'Anzeige im Popup' },
    'Montrer l\'historique dans la popup principale': {
      en: 'Show history in the main popup',
      es: 'Mostrar historial en el popup principal',
      de: 'Verlauf im Haupt-Popup anzeigen'
    },
    'Gestion des données': { en: 'Data management', es: 'Gestión de datos', de: 'Datenverwaltung' },
    'Exportation et nettoyage de l\'historique stocké localement.': {
      en: 'Export and clean locally stored history.',
      es: 'Exporta y limpia el historial almacenado localmente.',
      de: 'Lokal gespeicherten Verlauf exportieren und bereinigen.'
    },
    'Actions': { en: 'Actions', es: 'Acciones', de: 'Aktionen' },
    'Exporter au format JSON ou tout effacer': {
      en: 'Export as JSON or clear everything',
      es: 'Exportar en JSON o borrar todo',
      de: 'Als JSON exportieren oder alles löschen'
    },
    'Exporter': { en: 'Export', es: 'Exportar', de: 'Exportieren' },
    'Effacer l\'historique': { en: 'Clear history', es: 'Borrar historial', de: 'Verlauf löschen' },
    'Paramètres avancés': { en: 'Advanced settings', es: 'Ajustes avanzados', de: 'Erweiterte Einstellungen' },
    'Journalisation': { en: 'Logging', es: 'Registro', de: 'Protokollierung' },
    'Affichage technique dans la console des outils de développement.': {
      en: 'Technical output in the developer tools console.',
      es: 'Salida técnica en la consola de herramientas de desarrollo.',
      de: 'Technische Ausgabe in der Entwicklertools-Konsole.'
    },
    'Messages de debug': { en: 'Debug messages', es: 'Mensajes de depuración', de: 'Debug-Meldungen' },
    'Afficher les messages de débogage dans la console': {
      en: 'Show debug messages in the console',
      es: 'Mostrar mensajes de depuración en la consola',
      de: 'Debug-Meldungen in der Konsole anzeigen'
    },
    'Messages détaillés': { en: 'Detailed messages', es: 'Mensajes detallados', de: 'Ausführliche Meldungen' },
    'Afficher tous les détails d\'interaction (sélection, clics, etc.)': {
      en: 'Show all interaction details (selection, clicks, etc.)',
      es: 'Mostrar todos los detalles de interacción (selección, clics, etc.)',
      de: 'Alle Interaktionsdetails anzeigen (Auswahl, Klicks usw.)'
    },
    'Performances': { en: 'Performance', es: 'Rendimiento', de: 'Leistung' },
    'Afficher les métriques de performance': { en: 'Show performance metrics', es: 'Mostrar métricas de rendimiento', de: 'Leistungsmetriken anzeigen' },
    'À propos': { en: 'About', es: 'Acerca de', de: 'Info' },
    'Informations de version et liens utiles.': {
      en: 'Version information and useful links.',
      es: 'Información de versión y enlaces útiles.',
      de: 'Versionsinformationen und nützliche Links.'
    },
    'Dernière mise à jour': { en: 'Last update', es: 'Última actualización', de: 'Letzte Aktualisierung' },
    '16 juillet 2026': { en: 'July 16, 2026', es: '16 de julio de 2026', de: '16. Juli 2026' },
    'Développeur': { en: 'Developer', es: 'Desarrollador', de: 'Entwickler' },
    'Documentation': { en: 'Documentation', es: 'Documentación', de: 'Dokumentation' },
    'Support': { en: 'Support', es: 'Soporte', de: 'Support' },
    'Signaler un bug': { en: 'Report a bug', es: 'Informar de un error', de: 'Fehler melden' },
    'Paramètres sauvegardés automatiquement': {
      en: 'Settings saved automatically',
      es: 'Ajustes guardados automáticamente',
      de: 'Einstellungen automatisch gespeichert'
    },
    'Paramètres sauvegardés': { en: 'Settings saved', es: 'Ajustes guardados', de: 'Einstellungen gespeichert' },

    'Changer de thème': { en: 'Change theme', es: 'Cambiar tema', de: 'Design ändern' },
    'Détacher dans une fenêtre': {
      en: 'Open in a separate window',
      es: 'Abrir en una ventana independiente',
      de: 'In separatem Fenster öffnen'
    },
    'Impossible d’ouvrir la fenêtre séparée': {
      en: 'Unable to open the separate window',
      es: 'No se puede abrir la ventana independiente',
      de: 'Das separate Fenster konnte nicht geöffnet werden'
    },
    'Ouvrir l\'historique': { en: 'Open history', es: 'Abrir historial', de: 'Verlauf öffnen' },
    'Paramètres': { en: 'Settings', es: 'Ajustes', de: 'Einstellungen' },
    'Catégorie': { en: 'Category', es: 'Categoría', de: 'Kategorie' },
    'Rechercher...': { en: 'Search...', es: 'Buscar...', de: 'Suchen...' },
    'Montant': { en: 'Amount', es: 'Importe', de: 'Betrag' },
    'Convertir': { en: 'Convert', es: 'Convertir', de: 'Umrechnen' },
    '1 ou 1 kg*m/s^2 -> lbf': { en: '1 or 1 kg*m/s^2 -> lbf', es: '1 o 1 kg*m/s^2 -> lbf', de: '1 oder 1 kg*m/s^2 -> lbf' },
    'Expression invalide': { en: 'Invalid expression', es: 'Expresión no válida', de: 'Ungültiger Ausdruck' },
    'Exemple : 1 kg*m/s^2 -> lbf': { en: 'Example: 1 kg*m/s^2 -> lbf', es: 'Ejemplo: 1 kg*m/s^2 -> lbf', de: 'Beispiel: 1 kg*m/s^2 -> lbf' },
    'Exemple :': { en: 'Example:', es: 'Ejemplo:', de: 'Beispiel:' },
    'Aide sur la saisie manuelle': {
      en: 'Help with manual input',
      es: 'Ayuda sobre la entrada manual',
      de: 'Hilfe zur manuellen Eingabe'
    },
    'Nombre simple : utilisez les menus De et Vers.': {
      en: 'Simple number: use the From and To menus.',
      es: 'Número simple: usa los menús De y A.',
      de: 'Einfache Zahl: Verwende die Menüs Von und Nach.'
    },
    'Expression manuelle : valeur + unité source + séparateur + unité cible.': {
      en: 'Manual expression: value + source unit + separator + target unit.',
      es: 'Expresión manual: valor + unidad de origen + separador + unidad de destino.',
      de: 'Manueller Ausdruck: Wert + Ausgangseinheit + Trennwort + Zieleinheit.'
    },
    'Écriture scientifique également acceptée :': {
      en: 'Scientific notation is also accepted:',
      es: 'También se acepta la notación científica:',
      de: 'Wissenschaftliche Schreibweise wird ebenfalls akzeptiert:'
    },
    'Séparateurs :': { en: 'Separators:', es: 'Separadores:', de: 'Trennzeichen:' },
    'vers': { en: 'to', es: 'a', de: 'in' },
    'en': { en: 'in', es: 'hacia', de: 'nach' },
    'Augmenter le montant': { en: 'Increase amount', es: 'Aumentar importe', de: 'Betrag erhöhen' },
    'Diminuer le montant': { en: 'Decrease amount', es: 'Disminuir importe', de: 'Betrag verringern' },
    'De': { en: 'From', es: 'De', de: 'Von' },
    'Vers': { en: 'To', es: 'A', de: 'Nach' },
    'Inverser les unités': { en: 'Swap units', es: 'Intercambiar unidades', de: 'Einheiten tauschen' },
    'Inverser': { en: 'Swap', es: 'Intercambiar', de: 'Tauschen' },
    'Résultat': { en: 'Result', es: 'Resultado', de: 'Ergebnis' },
    'Copier': { en: 'Copy', es: 'Copiar', de: 'Kopieren' },
    'Partager': { en: 'Share', es: 'Compartir', de: 'Teilen' },
    'En ligne': { en: 'Online', es: 'En línea', de: 'Online' },
    'MAJ': { en: 'Updated', es: 'Act.', de: 'Akt.' },
    'MAJ: --:--': { en: 'Updated: --:--', es: 'Act.: --:--', de: 'Akt.: --:--' },
    'MAJ: aucun taux réel': { en: 'Updated: no real rate', es: 'Act.: sin tipo real', de: 'Akt.: kein echter Kurs' },
    'Cache': { en: 'Cache', es: 'Caché', de: 'Cache' },
    'Sélectionner une devise': { en: 'Select a currency', es: 'Seleccionar una divisa', de: 'Währung auswählen' },
    'Rechercher une devise...': { en: 'Search for a currency...', es: 'Buscar una divisa...', de: 'Währung suchen...' },
    'Widget raccourci': { en: 'Shortcut widget', es: 'Widget rápido', de: 'Schnell-Widget' },
    'Ouvrir Hub Converter active le widget pour l’onglet courant': {
      en: 'Opening Hub Converter activates the widget for the current tab',
      es: 'Abrir Hub Converter activa el widget en la pestaña actual',
      de: 'Das Öffnen von Hub Converter aktiviert das Widget für den aktuellen Tab'
    },
    'Enregistrer les conversions et afficher le bouton d\'historique dans le header': {
      en: 'Save conversions and show the history button in the header',
      es: 'Guardar conversiones y mostrar el botón de historial en el encabezado',
      de: 'Umrechnungen speichern und Verlaufsschaltfläche in der Kopfzeile anzeigen'
    },
    'Options complètes': { en: 'Full options', es: 'Opciones completas', de: 'Vollständige Optionen' },
    'Aucune conversion enregistrée': {
      en: 'No saved conversions',
      es: 'No hay conversiones guardadas',
      de: 'Keine gespeicherten Umrechnungen'
    },
    'Date inconnue': { en: 'Unknown date', es: 'Fecha desconocida', de: 'Unbekanntes Datum' },
    'Aucun taux réel disponible': { en: 'No real rate available', es: 'No hay tipo real disponible', de: 'Kein echter Kurs verfügbar' },
    'Résultat copié!': { en: 'Result copied!', es: 'Resultado copiado', de: 'Ergebnis kopiert' },
    'Erreur lors de la copie': { en: 'Copy failed', es: 'Error al copiar', de: 'Fehler beim Kopieren' },
    'Résultat prêt à partager': { en: 'Result ready to share', es: 'Resultado listo para compartir', de: 'Ergebnis bereit zum Teilen' },
    'Partage indisponible': { en: 'Sharing unavailable', es: 'Compartir no disponible', de: 'Teilen nicht verfügbar' },
    'Aucune unité disponible': { en: 'No unit available', es: 'No hay unidades disponibles', de: 'Keine Einheit verfügbar' },
    'Chargement des cryptomonnaies…': { en: 'Loading cryptocurrencies…', es: 'Cargando criptomonedas…', de: 'Kryptowährungen werden geladen…' },
    'Catalogue entièrement chargé': { en: 'Full catalog loaded', es: 'Catálogo completo cargado', de: 'Vollständiger Katalog geladen' },
    'Catalogue en ligne temporairement indisponible': { en: 'Online catalog temporarily unavailable', es: 'Catálogo en línea temporalmente no disponible', de: 'Online-Katalog vorübergehend nicht verfügbar' },
    'Indisponible': { en: 'Unavailable', es: 'No disponible', de: 'Nicht verfügbar' },
    'Aucun prix crypto réel disponible en cache': {
      en: 'No real crypto price available in cache',
      es: 'No hay precio real de cripto en caché',
      de: 'Kein echter Kryptopreis im Cache verfügbar'
    },
    'Aucun taux de change réel disponible en cache': {
      en: 'No real exchange rate available in cache',
      es: 'No hay tipo de cambio real en caché',
      de: 'Kein echter Wechselkurs im Cache verfügbar'
    },
    'Widget raccourci activé': { en: 'Shortcut widget enabled', es: 'Widget rápido activado', de: 'Schnell-Widget aktiviert' },
    'Widget raccourci désactivé': { en: 'Shortcut widget disabled', es: 'Widget rápido desactivado', de: 'Schnell-Widget deaktiviert' },
    'Historique activé': { en: 'History enabled', es: 'Historial activado', de: 'Verlauf aktiviert' },
    'Historique désactivé': { en: 'History disabled', es: 'Historial desactivado', de: 'Verlauf deaktiviert' },
    'Erreur lors de la sauvegarde du paramètre': {
      en: 'Error while saving the setting',
      es: 'Error al guardar el ajuste',
      de: 'Fehler beim Speichern der Einstellung'
    },
    'Une erreur est survenue': { en: 'An error occurred', es: 'Se produjo un error', de: 'Ein Fehler ist aufgetreten' },
    'Erreur de réseau': { en: 'Network error', es: 'Error de red', de: 'Netzwerkfehler' },

    'Fermer': { en: 'Close', es: 'Cerrar', de: 'Schließen' },
    'Détecté': { en: 'Detected', es: 'Detectado', de: 'Erkannt' },
    'Résultat rapide': { en: 'Quick result', es: 'Resultado rápido', de: 'Schnelles Ergebnis' },
    'Convertir en': { en: 'Convert to', es: 'Convertir a', de: 'Umrechnen in' },
    'Copier le résultat': { en: 'Copy result', es: 'Copiar resultado', de: 'Ergebnis kopieren' },
    'Choisissez une unité cible': { en: 'Choose a target unit', es: 'Elige una unidad de destino', de: 'Zieleinheit wählen' },
    'Conversion...': { en: 'Converting...', es: 'Convirtiendo...', de: 'Umrechnung...' },
    'Prix crypto en cours': { en: 'Loading crypto price', es: 'Precio cripto en curso', de: 'Kryptopreis wird geladen' },
    'Taux de change en cours': { en: 'Loading exchange rate', es: 'Tipo de cambio en curso', de: 'Wechselkurs wird geladen' },
    'Aucun taux réel disponible en cache': {
      en: 'No real rate available in cache',
      es: 'No hay tipo real en caché',
      de: 'Kein echter Kurs im Cache verfügbar'
    },
    'Taux ou unité non disponible': {
      en: 'Rate or unit unavailable',
      es: 'Tipo o unidad no disponible',
      de: 'Kurs oder Einheit nicht verfügbar'
    },
    'Copié': { en: 'Copied', es: 'Copiado', de: 'Kopiert' },
    'Erreur': { en: 'Error', es: 'Error', de: 'Fehler' },

    'Contraste faible': { en: 'Low contrast', es: 'Contraste bajo', de: 'Schwacher Kontrast' },
    'Contraste moyen': { en: 'Medium contrast', es: 'Contraste medio', de: 'Mittlerer Kontrast' },
    'Contraste excellent': { en: 'Excellent contrast', es: 'Contraste excelente', de: 'Ausgezeichneter Kontrast' },
    'Choisissez un preset à charger dans l\'éditeur :': {
      en: 'Choose a preset to load into the editor:',
      es: 'Elige un preset para cargar en el editor:',
      de: 'Wähle eine Vorgabe zum Laden in den Editor:'
    },
    'Saisissez le nom (ex: ocean) :': {
      en: 'Enter the name (ex: ocean):',
      es: 'Introduce el nombre (ej.: ocean):',
      de: 'Namen eingeben (z. B. ocean):'
    },
    'Preset inconnu.': { en: 'Unknown preset.', es: 'Preset desconocido.', de: 'Unbekannte Vorgabe.' },
    'Réinitialiser le thème personnalisé ?': {
      en: 'Reset the custom theme?',
      es: '¿Restablecer el tema personalizado?',
      de: 'Benutzerdefiniertes Design zurücksetzen?'
    },
    'Thème importé.': { en: 'Theme imported.', es: 'Tema importado.', de: 'Design importiert.' },
    'Fichier invalide.': { en: 'Invalid file.', es: 'Archivo no válido.', de: 'Ungültige Datei.' },
    'Appliquer le thème': { en: 'Apply theme', es: 'Aplicar tema', de: 'Design anwenden' },
    'Cache récent': { en: 'Recent cache', es: 'Caché reciente', de: 'Aktueller Cache' },
    'À jour': { en: 'Up to date', es: 'Actualizado', de: 'Aktuell' },
    'Non disponible': { en: 'Not available', es: 'No disponible', de: 'Nicht verfügbar' },
    'Désactivé': { en: 'Disabled', es: 'Desactivado', de: 'Deaktiviert' },
    'Mise à jour...': { en: 'Updating...', es: 'Actualizando...', de: 'Aktualisierung...' },
    'Cache conservé': { en: 'Cache kept', es: 'Caché conservada', de: 'Cache beibehalten' },
    'Mise à jour partielle': { en: 'Partially updated', es: 'Actualización parcial', de: 'Teilweise aktualisiert' },
    'Mise à jour impossible': { en: 'Update failed', es: 'Actualización imposible', de: 'Aktualisierung nicht möglich' },
    'Mis à jour !': { en: 'Updated!', es: 'Actualizado', de: 'Aktualisiert' },
    'Aucun historique à exporter': { en: 'No history to export', es: 'No hay historial para exportar', de: 'Kein Verlauf zum Exportieren' },
    'Erreur lors de l\'export de l\'historique': {
      en: 'Error while exporting history',
      es: 'Error al exportar el historial',
      de: 'Fehler beim Exportieren des Verlaufs'
    },
    'Êtes-vous sûr de vouloir effacer tout l\'historique ? Cette action est irréversible.': {
      en: 'Are you sure you want to clear all history? This action cannot be undone.',
      es: '¿Seguro que quieres borrar todo el historial? Esta acción es irreversible.',
      de: 'Möchtest du wirklich den gesamten Verlauf löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
    },
    'Historique effacé avec succès': {
      en: 'History cleared successfully',
      es: 'Historial borrado correctamente',
      de: 'Verlauf erfolgreich gelöscht'
    },
    'Erreur lors de l\'effacement de l\'historique': {
      en: 'Error while clearing history',
      es: 'Error al borrar el historial',
      de: 'Fehler beim Löschen des Verlaufs'
    },
    'Êtes-vous sûr de vouloir réinitialiser tous les paramètres ? Cette action est irréversible.': {
      en: 'Are you sure you want to reset all settings? This action cannot be undone.',
      es: '¿Seguro que quieres restablecer todos los ajustes? Esta acción es irreversible.',
      de: 'Möchtest du wirklich alle Einstellungen zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.'
    },
    'Paramètres réinitialisés avec succès': {
      en: 'Settings reset successfully',
      es: 'Ajustes restablecidos correctamente',
      de: 'Einstellungen erfolgreich zurückgesetzt'
    },
    'Erreur lors de la réinitialisation des paramètres': {
      en: 'Error while resetting settings',
      es: 'Error al restablecer los ajustes',
      de: 'Fehler beim Zurücksetzen der Einstellungen'
    },

    'Devises': { en: 'Currencies', es: 'Divisas', de: 'Währungen' },
    'EUR, USD, GBP...': { en: 'EUR, USD, GBP...', es: 'EUR, USD, GBP...', de: 'EUR, USD, GBP...' },
    'Bitcoin, Ethereum...': { en: 'Bitcoin, Ethereum...', es: 'Bitcoin, Ethereum...', de: 'Bitcoin, Ethereum...' },
    'Longueur': { en: 'Length', es: 'Longitud', de: 'Länge' },
    'Mètres, kilomètres...': { en: 'Meters, kilometers...', es: 'Metros, kilómetros...', de: 'Meter, Kilometer...' },
    'Masse': { en: 'Mass', es: 'Masa', de: 'Masse' },
    'Kilogrammes, livres...': { en: 'Kilograms, pounds...', es: 'Kilogramos, libras...', de: 'Kilogramm, Pfund...' },
    'Température': { en: 'Temperature', es: 'Temperatura', de: 'Temperatur' },
    'Celsius, Fahrenheit...': { en: 'Celsius, Fahrenheit...', es: 'Celsius, Fahrenheit...', de: 'Celsius, Fahrenheit...' },
    'Volume': { en: 'Volume', es: 'Volumen', de: 'Volumen' },
    'Litres, gallons...': { en: 'Liters, gallons...', es: 'Litros, galones...', de: 'Liter, Gallonen...' },
    'Énergie': { en: 'Energy', es: 'Energía', de: 'Energie' },
    'Joules, calories...': { en: 'Joules, calories...', es: 'Julios, calorías...', de: 'Joule, Kalorien...' },
    'Surface': { en: 'Area', es: 'Superficie', de: 'Fläche' },
    'M², hectares...': { en: 'm², hectares...', es: 'm², hectáreas...', de: 'm², Hektar...' },
    'Vitesse': { en: 'Speed', es: 'Velocidad', de: 'Geschwindigkeit' },
    'Km/h, mph...': { en: 'km/h, mph...', es: 'km/h, mph...', de: 'km/h, mph...' },
    'Temps': { en: 'Time', es: 'Tiempo', de: 'Zeit' },
    'Secondes, minutes...': { en: 'Seconds, minutes...', es: 'Segundos, minutos...', de: 'Sekunden, Minuten...' },
    'Données': { en: 'Data', es: 'Datos', de: 'Daten' },
    'Bits, octets...': { en: 'Bits, bytes...', es: 'Bits, bytes...', de: 'Bits, Bytes...' },
    'Pression': { en: 'Pressure', es: 'Presión', de: 'Druck' },
    'Pascals, bars...': { en: 'Pascals, bars...', es: 'Pascales, bares...', de: 'Pascal, Bar...' },
    'Puissance': { en: 'Power', es: 'Potencia', de: 'Leistung' },
    'Watts, chevaux...': { en: 'Watts, horsepower...', es: 'Vatios, caballos...', de: 'Watt, Pferdestärken...' },
    'Force': { en: 'Force', es: 'Fuerza', de: 'Kraft' },
    'Newtons, kgf...': { en: 'Newtons, kgf...', es: 'Newtons, kgf...', de: 'Newton, kgf...' },
    'Angle': { en: 'Angle', es: 'Ángulo', de: 'Winkel' },
    'Degrés, radians...': { en: 'Degrees, radians...', es: 'Grados, radianes...', de: 'Grad, Radiant...' },
    'Fréquence': { en: 'Frequency', es: 'Frecuencia', de: 'Frequenz' },
    'Hertz, rpm...': { en: 'Hertz, rpm...', es: 'Hercios, rpm...', de: 'Hertz, U/min...' },
    'Couple': { en: 'Torque', es: 'Par', de: 'Drehmoment' },
    'N·m, lbf·ft...': { en: 'N·m, lbf·ft...', es: 'N·m, lbf·ft...', de: 'N·m, lbf·ft...' },
    'Carburant': { en: 'Fuel', es: 'Combustible', de: 'Kraftstoff' },
    'L/100km, mpg...': { en: 'L/100km, mpg...', es: 'L/100km, mpg...', de: 'L/100km, mpg...' },
    'Densité': { en: 'Density', es: 'Densidad', de: 'Dichte' },
    'kg/m³, lb/ft³...': { en: 'kg/m³, lb/ft³...', es: 'kg/m³, lb/ft³...', de: 'kg/m³, lb/ft³...' },
    'Débit': { en: 'Flow rate', es: 'Caudal', de: 'Durchfluss' },
    'L/min, m³/h...': { en: 'L/min, m³/h...', es: 'L/min, m³/h...', de: 'L/min, m³/h...' },
    'Courant': { en: 'Current', es: 'Corriente', de: 'Strom' },
    'Ampères, mA...': { en: 'Amperes, mA...', es: 'Amperios, mA...', de: 'Ampere, mA...' },
    'Tension': { en: 'Voltage', es: 'Tensión', de: 'Spannung' },
    'Volts, mV...': { en: 'Volts, mV...', es: 'Voltios, mV...', de: 'Volt, mV...' },
    'Résistance': { en: 'Resistance', es: 'Resistencia', de: 'Widerstand' },
    'Ohms, kΩ...': { en: 'Ohms, kΩ...', es: 'Ohmios, kΩ...', de: 'Ohm, kΩ...' },
    'Charge électrique': { en: 'Electric charge', es: 'Carga eléctrica', de: 'Elektrische Ladung' },
    'Coulombs, Ah...': { en: 'Coulombs, Ah...', es: 'Culombios, Ah...', de: 'Coulomb, Ah...' },

    'Euro': { en: 'Euro', es: 'Euro', de: 'Euro' },
    'Dollar américain': { en: 'US Dollar', es: 'Dólar estadounidense', de: 'US-Dollar' },
    'Dollar US': { en: 'US Dollar', es: 'Dólar estadounidense', de: 'US-Dollar' },
    'Livre sterling': { en: 'Pound sterling', es: 'Libra esterlina', de: 'Pfund Sterling' },
    'Yen japonais': { en: 'Japanese yen', es: 'Yen japonés', de: 'Japanischer Yen' },
    'Franc suisse': { en: 'Swiss franc', es: 'Franco suizo', de: 'Schweizer Franken' },
    'Dollar canadien': { en: 'Canadian dollar', es: 'Dólar canadiense', de: 'Kanadischer Dollar' },
    'Dollar australien': { en: 'Australian dollar', es: 'Dólar australiano', de: 'Australischer Dollar' },
    'Yuan chinois': { en: 'Chinese yuan', es: 'Yuan chino', de: 'Chinesischer Yuan' },
    'Mètre': { en: 'Meter', es: 'Metro', de: 'Meter' },
    'Kilomètre': { en: 'Kilometer', es: 'Kilómetro', de: 'Kilometer' },
    'Centimètre': { en: 'Centimeter', es: 'Centímetro', de: 'Zentimeter' },
    'Millimètre': { en: 'Millimeter', es: 'Milímetro', de: 'Millimeter' },
    'Pied': { en: 'Foot', es: 'Pie', de: 'Fuß' },
    'Pouce': { en: 'Inch', es: 'Pulgada', de: 'Zoll' },
    'Mile': { en: 'Mile', es: 'Milla', de: 'Meile' },
    'Kilogramme': { en: 'Kilogram', es: 'Kilogramo', de: 'Kilogramm' },
    'Gramme': { en: 'Gram', es: 'Gramo', de: 'Gramm' },
    'Livre': { en: 'Pound', es: 'Libra', de: 'Pfund' },
    'Once': { en: 'Ounce', es: 'Onza', de: 'Unze' },
    'Tonne': { en: 'Metric ton', es: 'Tonelada', de: 'Tonne' },
    'Celsius': { en: 'Celsius', es: 'Celsius', de: 'Celsius' },
    'Fahrenheit': { en: 'Fahrenheit', es: 'Fahrenheit', de: 'Fahrenheit' },
    'Kelvin': { en: 'Kelvin', es: 'Kelvin', de: 'Kelvin' },
    'Litre': { en: 'Liter', es: 'Litro', de: 'Liter' },
    'Millilitre': { en: 'Milliliter', es: 'Mililitro', de: 'Milliliter' },
    'Gallon US': { en: 'US gallon', es: 'Galón estadounidense', de: 'US-Gallone' },
    'Quart': { en: 'Quart', es: 'Cuarto', de: 'Quart' },
    'Pinte': { en: 'Pint', es: 'Pinta', de: 'Pint' },
    'Once fluide': { en: 'Fluid ounce', es: 'Onza líquida', de: 'Flüssigunze' },
    'Joule': { en: 'Joule', es: 'Julio', de: 'Joule' },
    'Kilojoule': { en: 'Kilojoule', es: 'Kilojulio', de: 'Kilojoule' },
    'Calorie': { en: 'Calorie', es: 'Caloría', de: 'Kalorie' },
    'Kilocalorie': { en: 'Kilocalorie', es: 'Kilocaloría', de: 'Kilokalorie' },
    'Watt-heure': { en: 'Watt-hour', es: 'Vatio-hora', de: 'Wattstunde' },
    'Kilowatt-heure': { en: 'Kilowatt-hour', es: 'Kilovatio-hora', de: 'Kilowattstunde' },
    'Mètre carré': { en: 'Square meter', es: 'Metro cuadrado', de: 'Quadratmeter' },
    'Kilomètre carré': { en: 'Square kilometer', es: 'Kilómetro cuadrado', de: 'Quadratkilometer' },
    'Centimètre carré': { en: 'Square centimeter', es: 'Centímetro cuadrado', de: 'Quadratzentimeter' },
    'Pied carré': { en: 'Square foot', es: 'Pie cuadrado', de: 'Quadratfuß' },
    'Pouce carré': { en: 'Square inch', es: 'Pulgada cuadrada', de: 'Quadratzoll' },
    'Acre': { en: 'Acre', es: 'Acre', de: 'Acre' },
    'Hectare': { en: 'Hectare', es: 'Hectárea', de: 'Hektar' },
    'Kilomètre/heure': { en: 'Kilometer/hour', es: 'Kilómetro/hora', de: 'Kilometer/Stunde' },
    'Mètre/seconde': { en: 'Meter/second', es: 'Metro/segundo', de: 'Meter/Sekunde' },
    'Mile/heure': { en: 'Mile/hour', es: 'Milla/hora', de: 'Meile/Stunde' },
    'Pied/seconde': { en: 'Foot/second', es: 'Pie/segundo', de: 'Fuß/Sekunde' },
    'Nœud': { en: 'Knot', es: 'Nudo', de: 'Knoten' },
    'Conversion inverse selon la consommation': {
      en: 'Inverse conversion based on fuel consumption',
      es: 'Conversión inversa según el consumo',
      de: 'Inverse Umrechnung nach Verbrauch'
    },
    'Confidentialité': { en: 'Privacy', es: 'Privacidad', de: 'Datenschutz' },
    'Catégories disponibles': { en: 'Available categories', es: 'Categorías disponibles', de: 'Verfügbare Kategorien' },
    'Rechercher une devise': { en: 'Search for a currency', es: 'Buscar una divisa', de: 'Währung suchen' },
    'Unités disponibles': { en: 'Available units', es: 'Unidades disponibles', de: 'Verfügbare Einheiten' },
    'Récupération des taux de change réels': {
      en: 'Retrieving real exchange rates',
      es: 'Obteniendo tipos de cambio reales',
      de: 'Reale Wechselkurse werden abgerufen'
    },
    'Hub Converter — Politique de confidentialité': {
      en: 'Hub Converter - Privacy policy',
      es: 'Hub Converter - Política de privacidad',
      de: 'Hub Converter - Datenschutzerklärung'
    },
    'Politique de confidentialité': { en: 'Privacy policy', es: 'Política de privacidad', de: 'Datenschutzerklärung' },
    'Dernière mise à jour : 14 juillet 2026': {
      en: 'Last updated: July 14, 2026',
      es: 'Última actualización: 14 de julio de 2026',
      de: 'Letzte Aktualisierung: 14. Juli 2026'
    },
    'Hub Converter convertit des unités, des devises et des cryptomonnaies. L’extension ne crée aucun compte, n’affiche aucune publicité et n’utilise aucun outil d’analyse ou de suivi.': {
      en: 'Hub Converter converts units, currencies, and cryptocurrencies. The extension creates no account, displays no ads, and uses no analytics or tracking tools.',
      es: 'Hub Converter convierte unidades, divisas y criptomonedas. La extensión no crea cuentas, no muestra publicidad y no utiliza herramientas de análisis ni seguimiento.',
      de: 'Hub Converter rechnet Einheiten, Währungen und Kryptowährungen um. Die Erweiterung erstellt kein Konto, zeigt keine Werbung und verwendet keine Analyse- oder Tracking-Werkzeuge.'
    },
    'Texte sélectionné sur les pages': {
      en: 'Text selected on web pages',
      es: 'Texto seleccionado en las páginas',
      de: 'Auf Webseiten ausgewählter Text'
    },
    'Lorsque le widget est activé, le texte que vous sélectionnez est analysé uniquement dans votre navigateur afin de reconnaître une valeur et son unité. Ce texte, l’adresse de la page et votre historique de navigation ne sont jamais envoyés à l’éditeur ni aux fournisseurs de taux.': {
      en: 'When the widget is enabled, the text you select is analyzed only in your browser to recognize a value and its unit. This text, the page address, and your browsing history are never sent to the publisher or rate providers.',
      es: 'Cuando el widget está activado, el texto que seleccionas se analiza únicamente en tu navegador para reconocer un valor y su unidad. Este texto, la dirección de la página y tu historial de navegación nunca se envían al editor ni a los proveedores de tipos.',
      de: 'Wenn das Widget aktiviert ist, wird der ausgewählte Text ausschließlich in Ihrem Browser analysiert, um einen Wert und seine Einheit zu erkennen. Dieser Text, die Seitenadresse und Ihr Browserverlauf werden niemals an den Herausgeber oder Kursanbieter gesendet.'
    },
    'Données enregistrées': { en: 'Stored data', es: 'Datos almacenados', de: 'Gespeicherte Daten' },
    'Les paramètres de l’extension sont enregistrés avec le stockage du navigateur et peuvent être synchronisés par Chrome ou Firefox selon vos réglages de navigateur.': {
      en: 'Extension settings are saved in browser storage and may be synchronized by Chrome or Firefox according to your browser settings.',
      es: 'Los ajustes de la extensión se guardan en el almacenamiento del navegador y Chrome o Firefox pueden sincronizarlos según la configuración del navegador.',
      de: 'Die Erweiterungseinstellungen werden im Browserspeicher gespeichert und können je nach Browsereinstellungen von Chrome oder Firefox synchronisiert werden.'
    },
    'L’historique des conversions est désactivé par défaut. Si vous l’activez, il est conservé localement et ne contient que les valeurs, unités et résultats de conversion.': {
      en: 'Conversion history is disabled by default. If you enable it, it is kept locally and contains only conversion values, units, and results.',
      es: 'El historial de conversiones está desactivado de forma predeterminada. Si lo activas, se conserva localmente y solo contiene valores, unidades y resultados de conversión.',
      de: 'Der Umrechnungsverlauf ist standardmäßig deaktiviert. Wenn Sie ihn aktivieren, wird er lokal gespeichert und enthält nur Werte, Einheiten und Umrechnungsergebnisse.'
    },
    'Aucune conversion effectuée en navigation privée n’est enregistrée.': {
      en: 'Conversions made in private browsing are never saved.',
      es: 'Las conversiones realizadas en navegación privada nunca se guardan.',
      de: 'Umrechnungen im privaten Modus werden niemals gespeichert.'
    },
    'Connexions externes': { en: 'External connections', es: 'Conexiones externas', de: 'Externe Verbindungen' },
    'L’extension télécharge en HTTPS des snapshots publics Hub Converter distribués par GitHub Pages, jsDelivr et GitHub. En cas de panne générale, Frankfurter et Currency API peuvent servir de secours pour les devises ; Kraken, OKX, KuCoin, Gate.io et MEXC peuvent servir de secours pour les cryptomonnaies. Ces requêtes ne contiennent ni texte sélectionné, ni adresse de page, ni identifiant utilisateur.': {
      en: 'The extension downloads public Hub Converter snapshots over HTTPS from GitHub Pages, jsDelivr, and GitHub. During a general outage, Frankfurter and Currency API can provide fiat fallback rates; Kraken, OKX, KuCoin, Gate.io, and MEXC can provide cryptocurrency fallback rates. These requests contain no selected text, page address, or user identifier.',
      es: 'La extensión descarga mediante HTTPS instantáneas públicas de Hub Converter distribuidas por GitHub Pages, jsDelivr y GitHub. En caso de interrupción general, Frankfurter y Currency API pueden proporcionar tipos de respaldo para divisas; Kraken, OKX, KuCoin, Gate.io y MEXC pueden proporcionarlos para criptomonedas. Estas solicitudes no contienen texto seleccionado, direcciones de páginas ni identificadores de usuario.',
      de: 'Die Erweiterung lädt öffentliche Hub-Converter-Snapshots über HTTPS von GitHub Pages, jsDelivr und GitHub herunter. Bei einem allgemeinen Ausfall können Frankfurter und Currency API Ersatzkurse für Fiatwährungen liefern; Kraken, OKX, KuCoin, Gate.io und MEXC können Kryptokurse liefern. Diese Anfragen enthalten weder ausgewählten Text noch Seitenadressen oder Benutzerkennungen.'
    },
    'Contrôle et suppression': { en: 'Control and deletion', es: 'Control y eliminación', de: 'Kontrolle und Löschung' },
    'Vous pouvez désactiver le widget ou l’historique, exporter l’historique et l’effacer depuis les paramètres. La désinstallation de l’extension supprime les données locales conformément au fonctionnement du navigateur.': {
      en: 'You can disable the widget or history, export history, and clear it from settings. Uninstalling the extension removes local data according to browser behavior.',
      es: 'Puedes desactivar el widget o el historial, exportar el historial y borrarlo desde los ajustes. Al desinstalar la extensión, los datos locales se eliminan según el funcionamiento del navegador.',
      de: 'Sie können das Widget oder den Verlauf deaktivieren, den Verlauf exportieren und ihn in den Einstellungen löschen. Beim Deinstallieren entfernt der Browser die lokalen Daten gemäß seinem Verhalten.'
    },
    'Permissions': { en: 'Permissions', es: 'Permisos', de: 'Berechtigungen' },
    'L’accès aux pages web permet de détecter localement les valeurs que vous sélectionnez et d’afficher le widget sans devoir ouvrir Hub Converter sur chaque onglet. Le texte sélectionné n’est pas transmis à l’éditeur ni aux fournisseurs de taux. Les permissions de stockage et d’alarme servent aux préférences, à l’historique facultatif et à l’actualisation périodique des taux.': {
      en: 'Access to web pages lets Hub Converter detect selected values locally and display the widget without being opened in every tab. Selected text is not sent to the publisher or rate providers. Storage and alarm permissions are used for preferences, optional history, and periodic rate updates.',
      es: 'El acceso a las páginas web permite detectar localmente los valores seleccionados y mostrar el widget sin abrir Hub Converter en cada pestaña. El texto seleccionado no se envía al editor ni a los proveedores de tipos. Los permisos de almacenamiento y alarmas se utilizan para las preferencias, el historial opcional y las actualizaciones periódicas.',
      de: 'Der Zugriff auf Webseiten ermöglicht die lokale Erkennung ausgewählter Werte und die Anzeige des Widgets, ohne Hub Converter in jedem Tab zu öffnen. Ausgewählter Text wird weder an den Herausgeber noch an Kursanbieter gesendet. Speicher- und Alarmberechtigungen dienen Einstellungen, optionalem Verlauf und regelmäßigen Kursaktualisierungen.'
    },
    'Assistance': { en: 'Support', es: 'Asistencia', de: 'Support' },
    'Pour une question ou un signalement, utilisez la section d’assistance de la fiche officielle depuis laquelle vous avez installé l’extension.': {
      en: 'For questions or reports, use the support section of the official listing from which you installed the extension.',
      es: 'Para preguntas o incidencias, utiliza la sección de asistencia de la ficha oficial desde la que instalaste la extensión.',
      de: 'Für Fragen oder Meldungen verwenden Sie den Supportbereich des offiziellen Eintrags, über den Sie die Erweiterung installiert haben.'
    },
    'Ouvrir les paramètres': { en: 'Open settings', es: 'Abrir los ajustes', de: 'Einstellungen öffnen' },
    'Consulter la documentation': { en: 'View documentation', es: 'Consultar la documentación', de: 'Dokumentation ansehen' },
    'Hub Converter — Documentation': { en: 'Hub Converter - Documentation', es: 'Hub Converter - Documentación', de: 'Hub Converter - Dokumentation' },
    'Conversions rapides dans le popup et sur les pages web.': {
      en: 'Quick conversions in the popup and on web pages.',
      es: 'Conversiones rápidas en el popup y en las páginas web.',
      de: 'Schnelle Umrechnungen im Popup und auf Webseiten.'
    },
    'Utiliser le popup': { en: 'Use the popup', es: 'Usar el popup', de: 'Popup verwenden' },
    'Choisissez une catégorie, saisissez une valeur, puis sélectionnez les unités de départ et d’arrivée. Le bouton d’inversion échange les deux unités sans modifier la valeur saisie.': {
      en: 'Choose a category, enter a value, then select the source and target units. The swap button exchanges both units without changing the entered value.',
      es: 'Elige una categoría, introduce un valor y selecciona las unidades de origen y destino. El botón de inversión intercambia ambas unidades sin modificar el valor introducido.',
      de: 'Wählen Sie eine Kategorie, geben Sie einen Wert ein und wählen Sie Ausgangs- und Zieleinheit. Die Tauschtaste vertauscht beide Einheiten, ohne den eingegebenen Wert zu ändern.'
    },
    'Parcourir les familles': { en: 'Browse families', es: 'Explorar familias', de: 'Familien durchsuchen' },
    'Les 181 familles sont réparties dans 13 domaines : finance, quotidien, mécanique et fluides, énergie et thermique, électricité et magnétisme, chimie et laboratoire, médecine et santé, lumière et optique, acoustique, rayonnements, numérique et typographie, Terre et agriculture, sciences générales. La recherche accepte les noms de familles dans les quatre langues prises en charge.': {
      en: 'The 181 families are organized into 13 domains: finance, everyday, mechanics and fluids, energy and thermal, electricity and magnetism, chemistry and laboratory, medicine and health, light and optics, acoustics, radiation, digital and typography, Earth and agriculture, and general science. Search accepts family names in all four supported languages.',
      es: 'Las 181 familias se organizan en 13 ámbitos: finanzas, uso diario, mecánica y fluidos, energía y térmica, electricidad y magnetismo, química y laboratorio, medicina y salud, luz y óptica, acústica, radiaciones, digital y tipografía, Tierra y agricultura, y ciencias generales. La búsqueda acepta nombres de familias en los cuatro idiomas compatibles.',
      de: 'Die 181 Familien sind in 13 Bereiche gegliedert: Finanzen, Alltag, Mechanik und Fluide, Energie und Wärme, Elektrizität und Magnetismus, Chemie und Labor, Medizin und Gesundheit, Licht und Optik, Akustik, Strahlung, Digital und Typografie, Erde und Landwirtschaft sowie allgemeine Wissenschaften. Die Suche akzeptiert Familiennamen in allen vier unterstützten Sprachen.'
    },
    'Saisie numérique et raccourcis': { en: 'Numeric input and shortcuts', es: 'Entrada numérica y atajos', de: 'Zahleneingabe und Tastenkürzel' },
    'Lorsque le champ « Convertir » est actif, les flèches ↑ et ↓ ajustent la valeur de 1, Maj avec ces flèches ajuste de 10, et la molette augmente ou diminue la valeur selon son sens. Les boutons latéraux restent disponibles. Les valeurs négatives et la virgule décimale sont conservées. Ces commandes sont neutralisées lorsqu’une expression complète est saisie.': {
      en: 'When the “Convert” field is active, the ↑ and ↓ arrow keys adjust the value by 1, Shift with those keys adjusts it by 10, and the mouse wheel increases or decreases the value according to its direction. The side buttons remain available. Negative values and the decimal separator are preserved. These controls are disabled when a complete expression is entered.',
      es: 'Cuando el campo «Convertir» está activo, las flechas ↑ y ↓ ajustan el valor en 1, Mayús con esas teclas lo ajusta en 10 y la rueda del ratón aumenta o disminuye el valor según su dirección. Los botones laterales siguen disponibles. Se conservan los valores negativos y el separador decimal. Estos controles se desactivan al introducir una expresión completa.',
      de: 'Wenn das Feld „Umrechnen“ aktiv ist, ändern die Pfeiltasten ↑ und ↓ den Wert um 1, mit Umschalt um 10, und das Mausrad erhöht oder verringert den Wert je nach Richtung. Die seitlichen Tasten bleiben verfügbar. Negative Werte und das Dezimaltrennzeichen bleiben erhalten. Bei Eingabe eines vollständigen Ausdrucks sind diese Steuerungen deaktiviert.'
    },
    'Langues et formats': { en: 'Languages and formats', es: 'Idiomas y formatos', de: 'Sprachen und Formate' },
    'L’interface, les familles et les unités nommées sont disponibles en français, anglais, espagnol et allemand. Les nombres utilisant une virgule ou un point décimal, les espaces de groupement et le signe moins Unicode sont reconnus.': {
      en: 'The interface, families, and named units are available in French, English, Spanish, and German. Numbers using a decimal comma or point, grouping spaces, and the Unicode minus sign are recognized.',
      es: 'La interfaz, las familias y las unidades con nombre están disponibles en francés, inglés, español y alemán. Se reconocen los números con coma o punto decimal, los espacios de agrupación y el signo menos Unicode.',
      de: 'Die Oberfläche, Familien und benannten Einheiten sind auf Französisch, Englisch, Spanisch und Deutsch verfügbar. Zahlen mit Dezimalkomma oder -punkt, Gruppierungsleerzeichen und dem Unicode-Minuszeichen werden erkannt.'
    },
    'Utiliser le widget': { en: 'Use the widget', es: 'Usar el widget', de: 'Widget verwenden' },
    'Ouvrez d’abord Hub Converter dans l’onglet où vous souhaitez utiliser le widget, puis sélectionnez une valeur accompagnée d’une unité. Le widget apparaît près de la sélection lorsqu’elle peut être reconnue. Vous pouvez choisir l’unité cible ou copier le résultat.': {
      en: 'First open Hub Converter in the tab where you want to use the widget, then select a value with a unit. The widget appears near the selection when it can be recognized. You can choose the target unit or copy the result.',
      es: 'Abre primero Hub Converter en la pestaña donde quieras usar el widget y luego selecciona un valor acompañado de una unidad. El widget aparece junto a la selección cuando puede reconocerla. Puedes elegir la unidad de destino o copiar el resultado.',
      de: 'Öffnen Sie Hub Converter zuerst in dem Tab, in dem Sie das Widget verwenden möchten, und wählen Sie dann einen Wert mit Einheit aus. Das Widget erscheint neben der Auswahl, wenn sie erkannt werden kann. Sie können die Zieleinheit wählen oder das Ergebnis kopieren.'
    },
    'Les devises et cryptomonnaies utilisent uniquement des taux réels téléchargés et mis en cache. Si aucun taux réel n’est disponible, l’extension affiche clairement que la conversion est indisponible au lieu d’utiliser une valeur fictive.': {
      en: 'Currencies and cryptocurrencies use only downloaded and cached real rates. If no real rate is available, the extension clearly shows that conversion is unavailable instead of using a fictitious value.',
      es: 'Las divisas y criptomonedas solo utilizan tipos reales descargados y almacenados en caché. Si no hay un tipo real disponible, la extensión indica claramente que la conversión no está disponible en lugar de usar un valor ficticio.',
      de: 'Währungen und Kryptowährungen verwenden ausschließlich heruntergeladene und zwischengespeicherte reale Kurse. Ist kein realer Kurs verfügbar, zeigt die Erweiterung dies klar an, anstatt einen fiktiven Wert zu verwenden.'
    },
    'L’historique est facultatif et désactivé par défaut. Vous pouvez l’activer, le limiter, l’exporter ou l’effacer depuis les paramètres. Il reste désactivé en navigation privée.': {
      en: 'History is optional and disabled by default. You can enable, limit, export, or clear it from settings. It remains disabled in private browsing.',
      es: 'El historial es opcional y está desactivado de forma predeterminada. Puedes activarlo, limitarlo, exportarlo o borrarlo desde los ajustes. Permanece desactivado en navegación privada.',
      de: 'Der Verlauf ist optional und standardmäßig deaktiviert. Sie können ihn in den Einstellungen aktivieren, begrenzen, exportieren oder löschen. Im privaten Modus bleibt er deaktiviert.'
    },
    'Les paramètres du widget permettent d’activer uniquement les catégories utiles. Désactiver une catégorie empêche sa détection sur les pages sans retirer sa disponibilité dans le popup.': {
      en: 'Widget settings let you enable only useful categories. Disabling a category prevents its detection on pages without removing it from the popup.',
      es: 'Los ajustes del widget permiten activar únicamente las categorías útiles. Desactivar una categoría impide detectarla en las páginas sin quitarla del popup.',
      de: 'In den Widget-Einstellungen können Sie nur benötigte Kategorien aktivieren. Eine deaktivierte Kategorie wird auf Webseiten nicht erkannt, bleibt aber im Popup verfügbar.'
    },
    'Lire la politique de confidentialité': { en: 'Read the privacy policy', es: 'Leer la política de privacidad', de: 'Datenschutzerklärung lesen' },

    // Advanced documentation
    'Unités avancées automatiques': {
      en: 'Automatic advanced units',
      es: 'Unidades avanzadas automáticas',
      de: 'Automatische erweiterte Einheiten'
    },
    'Le champ « Convertir » accepte un nombre ordinaire ou une expression complète comme': {
      en: 'The “Convert” field accepts a regular number or a complete expression such as',
      es: 'El campo «Convertir» acepta un número normal o una expresión completa como',
      de: 'Das Feld „Umrechnen“ akzeptiert eine normale Zahl oder einen vollständigen Ausdruck wie'
    },
    'ou': { en: 'or', es: 'o', de: 'oder' },
    '. L’écriture scientifique équivalente, par exemple': {
      en: '. Equivalent scientific notation, for example',
      es: '. La notación científica equivalente, por ejemplo',
      de: '. Die entsprechende wissenschaftliche Schreibweise, zum Beispiel'
    },
    ', reste également acceptée. Les séparateurs': {
      en: ', is also accepted. The separators',
      es: ', también se acepta. Se reconocen los separadores',
      de: ', wird ebenfalls akzeptiert. Die Trennzeichen'
    },
    'et les mots de liaison français, anglais, espagnols ou allemands sont reconnus. Le moteur choisit automatiquement la catégorie compatible et affiche le résultat dans la carte habituelle. Une conversion entre dimensions physiques incompatibles est refusée explicitement.': {
      en: 'and French, English, Spanish, or German connecting words are recognized. The engine automatically selects the compatible category and displays the result in the usual card. A conversion between incompatible physical dimensions is explicitly rejected.',
      es: 'y las palabras de enlace en francés, inglés, español o alemán. El motor elige automáticamente la categoría compatible y muestra el resultado en la tarjeta habitual. Una conversión entre dimensiones físicas incompatibles se rechaza explícitamente.',
      de: 'und französische, englische, spanische oder deutsche Verbindungswörter werden erkannt. Die Engine wählt automatisch die passende Kategorie und zeigt das Ergebnis in der gewohnten Karte an. Eine Umrechnung zwischen inkompatiblen physikalischen Dimensionen wird ausdrücklich abgelehnt.'
    },
    'Conversions dépendantes du contexte': {
      en: 'Context-dependent conversions',
      es: 'Conversiones dependientes del contexto',
      de: 'Kontextabhängige Umrechnungen'
    },
    'Certaines conversions ne possèdent pas de réponse unique sans information supplémentaire. Le moteur demande alors le contexte requis : densité pour masse/volume, durée pour énergie/puissance ou données/débit, tension pour puissance/courant. Il n’invente jamais une valeur physique manquante.': {
      en: 'Some conversions do not have a unique answer without additional information. The engine then requests the required context: density for mass/volume, duration for energy/power or data/data rate, and voltage for power/current. It never invents a missing physical value.',
      es: 'Algunas conversiones no tienen una respuesta única sin información adicional. El motor solicita entonces el contexto necesario: densidad para masa/volumen, duración para energía/potencia o datos/velocidad de datos y tensión para potencia/corriente. Nunca inventa un valor físico que falte.',
      de: 'Einige Umrechnungen haben ohne zusätzliche Angaben keine eindeutige Antwort. Die Engine fragt dann den erforderlichen Kontext ab: Dichte für Masse/Volumen, Dauer für Energie/Leistung oder Daten/Datenrate und Spannung für Leistung/Stromstärke. Ein fehlender physikalischer Wert wird niemals erfunden.'
    },
    'Détection fiable et unités ambiguës': { en: 'Reliable detection and ambiguous units', es: 'Detección fiable y unidades ambiguas', de: 'Zuverlässige Erkennung und mehrdeutige Einheiten' },
    'Le moteur couvre 181 familles, 1 481 unités déclarées et 48 321 chemins directs testés, auxquels s’ajoutent les expressions dimensionnelles composables. Lorsqu’un même symbole peut représenter plusieurs grandeurs physiques, les conversions restent disponibles manuellement mais la détection automatique conserve uniquement un contexte canonique. Les unités arbitraires ou dépendantes d’une substance, d’un protocole ou de conditions de référence ne sont pas converties avec un facteur supposé.': {
      en: 'The engine covers 181 families, 1,481 declared units, and 48,321 tested direct paths, plus composable dimensional expressions. When the same symbol can represent several physical quantities, conversions remain manually available, but automatic detection keeps only one canonical context. Arbitrary units or units that depend on a substance, procedure, or reference conditions are not converted with an assumed factor.',
      es: 'El motor cubre 181 familias, 1 481 unidades declaradas y 48 321 rutas directas probadas, además de expresiones dimensionales combinables. Cuando un mismo símbolo puede representar varias magnitudes físicas, las conversiones siguen disponibles manualmente, pero la detección automática conserva un único contexto canónico. Las unidades arbitrarias o dependientes de una sustancia, un procedimiento o condiciones de referencia no se convierten con un factor supuesto.',
      de: 'Die Engine deckt 181 Familien, 1.481 deklarierte Einheiten und 48.321 getestete direkte Pfade sowie kombinierbare Dimensionsausdrücke ab. Wenn dasselbe Symbol mehrere physikalische Größen darstellen kann, bleiben die Umrechnungen manuell verfügbar, die automatische Erkennung verwendet jedoch nur einen kanonischen Kontext. Willkürliche oder von einem Stoff, Verfahren oder Referenzbedingungen abhängige Einheiten werden nicht mit einem angenommenen Faktor umgerechnet.'
    },
    'Ajustement : ↑/↓ = ±1, Maj+↑/↓ = ±10, molette lorsque le champ est actif.': {
      en: 'Adjustment: ↑/↓ = ±1, Shift+↑/↓ = ±10, mouse wheel while the field is active.',
      es: 'Ajuste: ↑/↓ = ±1, Mayús+↑/↓ = ±10, rueda del ratón cuando el campo está activo.',
      de: 'Anpassung: ↑/↓ = ±1, Umschalt+↑/↓ = ±10, Mausrad bei aktivem Feld.'
    },
    'Les devises et cryptomonnaies utilisent uniquement des taux réels téléchargés et mis en cache. La recherche crypto utilise le catalogue agrégé Hub Converter, produit depuis plusieurs marchés et distribué par plusieurs miroirs statiques. Si aucun marché réel n’existe, l’extension indique que l’actif n’est pas coté au lieu d’utiliser une valeur fictive.': {
      en: 'Currencies and cryptocurrencies use only downloaded and cached real rates. Crypto search uses the aggregated Hub Converter catalog, built from several markets and distributed through several static mirrors. If no real market exists, the extension indicates that the asset is not listed instead of using a fictitious value.',
      es: 'Las divisas y criptomonedas solo utilizan tipos reales descargados y almacenados en caché. La búsqueda de criptomonedas utiliza el catálogo agregado de Hub Converter, creado a partir de varios mercados y distribuido mediante varios espejos estáticos. Si no existe ningún mercado real, la extensión indica que el activo no cotiza en lugar de utilizar un valor ficticio.',
      de: 'Währungen und Kryptowährungen verwenden ausschließlich heruntergeladene und zwischengespeicherte reale Kurse. Die Kryptosuche nutzt den aggregierten Hub-Converter-Katalog, der aus mehreren Märkten erstellt und über mehrere statische Spiegel verteilt wird. Gibt es keinen realen Markt, zeigt die Erweiterung an, dass der Vermögenswert nicht notiert ist, anstatt einen fiktiven Wert zu verwenden.'
    },
    'Les paramètres du widget permettent d’activer uniquement les catégories utiles. Le moteur couvre 181 familles, 1 481 unités déclarées et 48 321 chemins directs testés, auxquels s’ajoutent les expressions dimensionnelles composables. Désactiver une catégorie empêche sa détection sur les pages sans retirer sa disponibilité dans le popup.': {
      en: 'Widget settings let you enable only the categories you need. The engine covers 181 families, 1,481 declared units, and 48,321 tested direct paths, plus composable dimensional expressions. Disabling a category prevents its detection on web pages without removing it from the popup.',
      es: 'Los ajustes del widget permiten activar únicamente las categorías necesarias. El motor cubre 181 familias, 1 481 unidades declaradas y 48 321 rutas directas probadas, además de expresiones dimensionales combinables. Desactivar una categoría impide detectarla en las páginas sin quitarla del popup.',
      de: 'In den Widget-Einstellungen lassen sich nur die benötigten Kategorien aktivieren. Die Engine deckt 181 Familien, 1.481 deklarierte Einheiten und 48.321 getestete direkte Pfade sowie kombinierbare Dimensionsausdrücke ab. Eine deaktivierte Kategorie wird auf Webseiten nicht erkannt, bleibt aber im Popup verfügbar.'
    },

    // Settings sections and dynamic theme content
    'Apparence et interface': { en: 'Appearance and interface', es: 'Apariencia e interfaz', de: 'Darstellung und Oberfläche' },
    'Sobre, slate + bleu': { en: 'Subtle, slate + blue', es: 'Sobrio, pizarra + azul', de: 'Dezent, Schiefer + Blau' },
    'Neutre, sans artifice': { en: 'Neutral, no frills', es: 'Neutro, sin artificios', de: 'Neutral, ohne Schnörkel' },
    'Noir et nuances': { en: 'Black and shades', es: 'Negro y matices', de: 'Schwarz und Abstufungen' },
    'Bleu-gris froid': { en: 'Cool blue-gray', es: 'Azul grisáceo frío', de: 'Kühles Blaugrau' },
    'Neutre chaud, café': { en: 'Warm neutral, coffee', es: 'Neutro cálido, café', de: 'Warm und neutral, Kaffee' },
    'Bleu, teal, ambre': { en: 'Blue, teal, amber', es: 'Azul, verde azulado, ámbar', de: 'Blau, Türkis, Bernstein' },
    'Bleu profond': { en: 'Deep blue', es: 'Azul profundo', de: 'Tiefblau' },
    'Chaud et vivant': { en: 'Warm and vibrant', es: 'Cálido y vivo', de: 'Warm und lebendig' },
    'Vert premium': { en: 'Premium green', es: 'Verde premium', de: 'Edles Grün' },
    'Violet énergique': { en: 'Energetic purple', es: 'Violeta enérgico', de: 'Energiegeladenes Violett' },
    'Coloré clair': { en: 'Bright and colorful', es: 'Claro y colorido', de: 'Hell und farbenfroh' },
    'Neutre moderne': { en: 'Modern neutral', es: 'Neutro moderno', de: 'Modern und neutral' },
    'Calme et lisible': { en: 'Calm and readable', es: 'Sereno y legible', de: 'Ruhig und gut lesbar' },
    'Votre palette': { en: 'Your palette', es: 'Tu paleta', de: 'Ihre Palette' },
    'Sélectionnez « Personnalisé » pour afficher les styles, effets et durées avancés.': {
      en: 'Select “Custom” to display advanced styles, effects, and durations.',
      es: 'Selecciona «Personalizado» para mostrar los estilos, efectos y duraciones avanzados.',
      de: 'Wählen Sie „Benutzerdefiniert“, um erweiterte Stile, Effekte und Dauern anzuzeigen.'
    },
    'Conversion et taux': { en: 'Conversion and rates', es: 'Conversión y tipos', de: 'Umrechnung und Kurse' },
    'Données et historique': { en: 'Data and history', es: 'Datos e historial', de: 'Daten und Verlauf' },
    'Réinitialiser l’extension': { en: 'Reset extension', es: 'Restablecer la extensión', de: 'Erweiterung zurücksetzen' },
    'Efface les préférences, l’historique et les données locales pour revenir aux réglages d’origine.': {
      en: 'Clears preferences, history, and local data to restore the original settings.',
      es: 'Borra las preferencias, el historial y los datos locales para restaurar los ajustes originales.',
      de: 'Löscht Einstellungen, Verlauf und lokale Daten und stellt die ursprünglichen Einstellungen wieder her.'
    },
    'Choisissez un preset à charger dans l\'\u00e9diteur :': {
      en: 'Choose a preset to load into the editor:',
      es: 'Elige un preajuste para cargarlo en el editor:',
      de: 'Wählen Sie eine Vorgabe zum Laden in den Editor:'
    },
    'Saisissez le nom (ex: ocean) :': {
      en: 'Enter the name (e.g. ocean):',
      es: 'Introduce el nombre (p. ej., ocean):',
      de: 'Geben Sie den Namen ein (z. B. ocean):'
    },
    'Preset inconnu.': { en: 'Unknown preset.', es: 'Preajuste desconocido.', de: 'Unbekannte Vorgabe.' },

    // Dynamic selector labels and live states
    'une devise': { en: 'a currency', es: 'una divisa', de: 'eine Währung' },
    'une cryptomonnaie': { en: 'a cryptocurrency', es: 'una criptomoneda', de: 'eine Kryptowährung' },
    'une unité de longueur': { en: 'a length unit', es: 'una unidad de longitud', de: 'eine Längeneinheit' },
    'une unité de masse': { en: 'a mass unit', es: 'una unidad de masa', de: 'eine Masseneinheit' },
    'une unité de température': { en: 'a temperature unit', es: 'una unidad de temperatura', de: 'eine Temperatureinheit' },
    'une unité de volume': { en: 'a volume unit', es: 'una unidad de volumen', de: 'eine Volumeneinheit' },
    'une unité de surface': { en: 'an area unit', es: 'una unidad de superficie', de: 'eine Flächeneinheit' },
    'une unité de vitesse': { en: 'a speed unit', es: 'una unidad de velocidad', de: 'eine Geschwindigkeitseinheit' },
    'une unité d\'\u00e9nergie': { en: 'an energy unit', es: 'una unidad de energía', de: 'eine Energieeinheit' },
    'une unité de temps': { en: 'a time unit', es: 'una unidad de tiempo', de: 'eine Zeiteinheit' },
    'une unité de données': { en: 'a data unit', es: 'una unidad de datos', de: 'eine Dateneinheit' },
    'une unité de pression': { en: 'a pressure unit', es: 'una unidad de presión', de: 'eine Druckeinheit' },
    'une unité de puissance': { en: 'a power unit', es: 'una unidad de potencia', de: 'eine Leistungseinheit' },
    'une unité de force': { en: 'a force unit', es: 'una unidad de fuerza', de: 'eine Krafteinheit' },
    'une unité d\'angle': { en: 'an angle unit', es: 'una unidad de ángulo', de: 'eine Winkeleinheit' },
    'une unité de fréquence': { en: 'a frequency unit', es: 'una unidad de frecuencia', de: 'eine Frequenzeinheit' },
    'une unité de couple': { en: 'a torque unit', es: 'una unidad de par', de: 'eine Drehmomenteinheit' },
    'une unité de consommation': { en: 'a fuel consumption unit', es: 'una unidad de consumo', de: 'eine Verbrauchseinheit' },
    'une unité de densité': { en: 'a density unit', es: 'una unidad de densidad', de: 'eine Dichteeinheit' },
    'une unité de débit': { en: 'a flow-rate unit', es: 'una unidad de caudal', de: 'eine Durchflusseinheit' },
    'une unité de courant': { en: 'an electric-current unit', es: 'una unidad de corriente', de: 'eine Stromstärkeeinheit' },
    'une unité de tension': { en: 'a voltage unit', es: 'una unidad de tensión', de: 'eine Spannungseinheit' },
    'une unité de résistance': { en: 'a resistance unit', es: 'una unidad de resistencia', de: 'eine Widerstandseinheit' },
    'une unité de charge': { en: 'an electric-charge unit', es: 'una unidad de carga', de: 'eine Ladungseinheit' },
    'une unité': { en: 'a unit', es: 'una unidad', de: 'eine Einheit' },
    'Mètres carrés...': { en: 'Square meters...', es: 'Metros cuadrados...', de: 'Quadratmeter...' },
    'Catalogue crypto indisponible': { en: 'Crypto catalog unavailable', es: 'Catálogo de criptomonedas no disponible', de: 'Kryptokatalog nicht verfügbar' },
    'Chargement des cryptomonnaies…': { en: 'Loading cryptocurrencies…', es: 'Cargando criptomonedas…', de: 'Kryptowährungen werden geladen…' },
    'Cours enregistrés disponibles — actualisation différée': { en: 'Saved prices available — refresh delayed', es: 'Precios guardados disponibles — actualización aplazada', de: 'Gespeicherte Kurse verfügbar — Aktualisierung verzögert' },
    'Catalogue entièrement chargé': { en: 'Catalog fully loaded', es: 'Catálogo cargado por completo', de: 'Katalog vollständig geladen' },
    'Catalogue en ligne temporairement indisponible': { en: 'Online catalog temporarily unavailable', es: 'Catálogo en línea temporalmente no disponible', de: 'Online-Katalog vorübergehend nicht verfügbar' },
    'Taux réel en attente': { en: 'Waiting for real rate', es: 'Esperando el tipo real', de: 'Echter Kurs ausstehend' },
    'Prix réel en attente': { en: 'Waiting for real price', es: 'Esperando el precio real', de: 'Echter Preis ausstehend' }
  };

  Object.keys(CATALOG).forEach((key) => {
    CATALOG[key].fr = key;
  });

  let currentLanguage = 'fr';
  let originalDocumentTitle = '';
  let translatedDocumentTitle = '';
  const observedRoots = new Set();
  const originalText = new WeakMap();
  const translatedText = new WeakMap();
  const originalAttrs = new WeakMap();
  const translatedAttrs = new WeakMap();
  const observers = new WeakMap();
  const TRANSLATABLE_ATTRS = ['title', 'aria-label', 'placeholder', 'label'];
  const SKIP_TEXT_PARENTS = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'SVG', 'PATH', 'G', 'DEFS']);

  function normalizeLanguage(language) {
    const code = String(language || '').slice(0, 2).toLowerCase();
    return SUPPORTED_LANGUAGES.includes(code) ? code : 'fr';
  }

  function getLocale(language = currentLanguage) {
    return LOCALES[normalizeLanguage(language)] || LOCALES.fr;
  }

  function translateTechnicalName(source) {
    const languageIndex = { en: 0, es: 1, de: 2 }[currentLanguage];
    const technical = TECHNICAL_UNIT_NAMES[source];
    if (technical && languageIndex !== undefined) return technical[languageIndex];

    const currencyUnits = global.HubConverterEngine?.units?.currency || [];
    const currency = currencyUnits.find(unitValue => unitValue.name === source);
    if (currency && typeof Intl.DisplayNames === 'function') {
      try {
        return new Intl.DisplayNames([getLocale()], { type: 'currency' }).of(currency.code) || source;
      } catch (_) {
        return source;
      }
    }

    return source;
  }

  function registerEngineCatalog(engine) {
    Object.values(engine?.categoryDomains || {}).forEach((domainValue) => {
      if (!domainValue?.name || !domainValue.translations) return;
      TECHNICAL_UNIT_NAMES[domainValue.name] = [
        domainValue.translations.en || domainValue.name,
        domainValue.translations.es || domainValue.name,
        domainValue.translations.de || domainValue.name
      ];
    });

    Object.entries(engine?.units || {}).forEach(([categoryKey, units]) => {
      if (categoryKey === 'currency' || categoryKey === 'crypto') return;
      units.forEach((unitValue) => {
        if (TECHNICAL_UNIT_NAMES[unitValue.name]) return;
        if (Array.isArray(unitValue.translations) && unitValue.translations.length === 3) {
          TECHNICAL_UNIT_NAMES[unitValue.name] = [...unitValue.translations];
          return;
        }
        const internationalLabel = unitValue.shortName || unitValue.code || unitValue.name;
        TECHNICAL_UNIT_NAMES[unitValue.name] = [internationalLabel, internationalLabel, internationalLabel];
      });
    });

    Object.values(engine?.categories || {}).forEach((categoryValue) => {
      if (Array.isArray(categoryValue.translations?.name)) {
        TECHNICAL_UNIT_NAMES[categoryValue.name] = [...categoryValue.translations.name];
      }
      if (Array.isArray(categoryValue.translations?.desc)) {
        TECHNICAL_UNIT_NAMES[categoryValue.desc] = [...categoryValue.translations.desc];
      }
      [categoryValue.name, categoryValue.desc].forEach((label) => {
        if (!label || TECHNICAL_UNIT_NAMES[label] || CATALOG[label]) return;
        TECHNICAL_UNIT_NAMES[label] = [label, label, label];
      });
    });
  }

  function translateDirect(source) {
    const entry = CATALOG[source];
    return entry?.[currentLanguage] || translateTechnicalName(source);
  }

  function translatePattern(source) {
    let match = source.match(/^(.+?) \(([^)]+)\)$/);
    if (match) {
      return `${translateCore(match[1])} (${match[2]})`;
    }

    match = source.match(/^(.+?)\s+→\s+(.+)$/);
    if (match) {
      return `${match[1]} → ${translateCore(match[2])}`;
    }

    match = source.match(/^MAJ: (.+)$/);
    if (match) {
      return `${translateCore('MAJ')}: ${match[1]}`;
    }

    match = source.match(/^Cache: (.+)$/);
    if (match) {
      return `${translateCore('Cache')}: ${match[1]}`;
    }

    match = source.match(/^Aucun cours actuel pour (.+)$/);
    if (match) {
      if (currentLanguage === 'en') return `No current price for ${match[1]}`;
      if (currentLanguage === 'es') return `No hay precio actual para ${match[1]}`;
      if (currentLanguage === 'de') return `Kein aktueller Kurs für ${match[1]}`;
    }

    match = source.match(/^Cache (\d+)h$/);
    if (match) {
      if (currentLanguage === 'en') return `Cached ${match[1]}h ago`;
      if (currentLanguage === 'es') return `Caché hace ${match[1]} h`;
      if (currentLanguage === 'de') return `Cache vor ${match[1]} Std.`;
    }

    match = source.match(/^Il y a (\d+)h$/);
    if (match) {
      if (currentLanguage === 'en') return `${match[1]}h ago`;
      if (currentLanguage === 'es') return `Hace ${match[1]} h`;
      if (currentLanguage === 'de') return `Vor ${match[1]} Std.`;
    }

    match = source.match(/^(\d{2}\/\d{2}\/\d{4}) à (.+)$/);
    if (match) {
      if (currentLanguage === 'en') return `${match[1]} at ${match[2]}`;
      if (currentLanguage === 'es') return `${match[1]} a las ${match[2]}`;
      if (currentLanguage === 'de') return `${match[1]} um ${match[2]}`;
    }

    match = source.match(/^Sélectionner (.+)$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `Select ${target}`;
      if (currentLanguage === 'es') return `Seleccionar ${target}`;
      if (currentLanguage === 'de') return `${target} auswählen`;
    }

    match = source.match(/^Rechercher (.+)\.\.\.$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `Search ${target}...`;
      if (currentLanguage === 'es') return `Buscar ${target}...`;
      if (currentLanguage === 'de') return `${target} suchen...`;
    }

    match = source.match(/^Catégorie (.+) sélectionnée$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `${target} category selected`;
      if (currentLanguage === 'es') return `Categoría ${target} seleccionada`;
      if (currentLanguage === 'de') return `Kategorie ${target} ausgewählt`;
    }

    match = source.match(/^(\d+) catégories sur (\d+) activées$/);
    if (match) {
      if (currentLanguage === 'en') return `${match[1]} of ${match[2]} categories enabled`;
      if (currentLanguage === 'es') return `${match[1]} de ${match[2]} categorías activadas`;
      if (currentLanguage === 'de') return `${match[1]} von ${match[2]} Kategorien aktiviert`;
    }

    match = source.match(/^Toutes les catégories · (\d+) activées$/);
    if (match) {
      if (currentLanguage === 'en') return `All categories · ${match[1]} enabled`;
      if (currentLanguage === 'es') return `Todas las categorías · ${match[1]} activadas`;
      if (currentLanguage === 'de') return `Alle Kategorien · ${match[1]} aktiviert`;
    }

    match = source.match(/^Devise de base: (.+)$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `Base currency: ${target}`;
      if (currentLanguage === 'es') return `Divisa base: ${target}`;
      if (currentLanguage === 'de') return `Basiswährung: ${target}`;
    }

    match = source.match(/^Base: (.+)$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `Base: ${target}`;
      if (currentLanguage === 'es') return `Base: ${target}`;
      if (currentLanguage === 'de') return `Basis: ${target}`;
    }

    match = source.match(/^(.+) sélectionné$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `${target} selected`;
      if (currentLanguage === 'es') return `${target} seleccionado`;
      if (currentLanguage === 'de') return `${target} ausgewählt`;
    }

    match = source.match(/^Appliquer le thème (.+)$/);
    if (match) {
      const target = translateCore(match[1]);
      if (currentLanguage === 'en') return `Apply ${target} theme`;
      if (currentLanguage === 'es') return `Aplicar tema ${target}`;
      if (currentLanguage === 'de') return `Design ${target} anwenden`;
    }

    match = source.match(/^Contraste (faible|moyen|excellent) \((.+)\)$/);
    if (match) {
      return `${translateCore(`Contraste ${match[1]}`)} (${match[2]})`;
    }

    return source;
  }

  function translateCore(source) {
    if (!source) return source;
    const direct = translateDirect(source);
    if (direct !== source) return direct;
    return translatePattern(source);
  }

  function t(value) {
    if (value === undefined || value === null) return '';
    const raw = String(value);
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    const core = raw.trim();
    if (!core) return raw;
    return `${leading}${translateCore(core)}${trailing}`;
  }

  function shouldTranslateTextNode(node) {
    const parent = node.parentElement;
    if (!parent || SKIP_TEXT_PARENTS.has(parent.tagName)) return false;
    const text = node.nodeValue || '';
    if (!text.trim()) return false;
    return /[A-Za-zÀ-ÿ]/.test(text);
  }

  function translateTextNode(node) {
    if (!shouldTranslateTextNode(node)) return;
    const current = node.nodeValue;
    let source = originalText.get(node);
    const previousTranslation = translatedText.get(node);

    if (!source || (previousTranslation && current !== previousTranslation && current !== source)) {
      source = current;
      originalText.set(node, source);
    }

    const next = t(source);
    translatedText.set(node, next);
    if (current !== next) {
      node.nodeValue = next;
    }
  }

  function translateElementAttributes(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    TRANSLATABLE_ATTRS.forEach((attr) => {
      if (!element.hasAttribute(attr)) return;
      const current = element.getAttribute(attr);
      if (!current || !/[A-Za-zÀ-ÿ]/.test(current)) return;

      const sourceByAttr = originalAttrs.get(element) || {};
      const translationByAttr = translatedAttrs.get(element) || {};
      let source = sourceByAttr[attr];
      const previousTranslation = translationByAttr[attr];

      if (!source || (previousTranslation && current !== previousTranslation && current !== source)) {
        source = current;
        sourceByAttr[attr] = source;
        originalAttrs.set(element, sourceByAttr);
      }

      const next = t(source);
      translationByAttr[attr] = next;
      translatedAttrs.set(element, translationByAttr);
      if (current !== next) {
        element.setAttribute(attr, next);
      }
    });
  }

  function apply(root = global.document) {
    if (!root) return;
    const walkerRoot = root.nodeType === Node.DOCUMENT_NODE ? root.body || root.documentElement : root;
    if (!walkerRoot) return;

    if (walkerRoot.nodeType === Node.ELEMENT_NODE) {
      translateElementAttributes(walkerRoot);
    }

    const walker = document.createTreeWalker(
      walkerRoot,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            return shouldTranslateTextNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
          if (node.nodeType === Node.ELEMENT_NODE && SKIP_TEXT_PARENTS.has(node.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node = walker.currentNode;
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        translateTextNode(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        translateElementAttributes(node);
      }
      node = walker.nextNode();
    }
  }

  function observe(root = global.document) {
    if (!root || observers.has(root) || typeof MutationObserver === 'undefined') return;
    const target = root.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
    if (!target) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          translateTextNode(mutation.target);
          return;
        }
        if (mutation.type === 'attributes') {
          translateElementAttributes(mutation.target);
          return;
        }
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) apply(node);
        });
      });
    });

    observer.observe(target, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRS
    });
    observers.set(root, observer);
  }

  function registerRoot(root = global.document) {
    if (!root) return;
    observedRoots.add(root);
    apply(root);
    observe(root);
  }

  function applyAll() {
    observedRoots.forEach((root) => apply(root));
    if (global.document?.documentElement) {
      global.document.documentElement.lang = currentLanguage;
      const currentTitle = global.document.title || '';
      if (!originalDocumentTitle || (translatedDocumentTitle && currentTitle !== translatedDocumentTitle && currentTitle !== originalDocumentTitle)) {
        originalDocumentTitle = currentTitle;
      }
      const nextTitle = t(originalDocumentTitle);
      translatedDocumentTitle = nextTitle;
      if (currentTitle !== nextTitle) global.document.title = nextTitle;
    }
  }

  function setLanguage(language) {
    currentLanguage = normalizeLanguage(language);
    applyAll();
  }

  async function loadLanguage() {
    try {
      if (!global.chrome?.storage?.sync) {
        let requestedLanguage = null;
        try {
          requestedLanguage = global.URLSearchParams
            ? new global.URLSearchParams(global.location?.search || '').get('lang')
            : null;
        } catch (_) {
          requestedLanguage = null;
        }
        setLanguage(requestedLanguage || global.navigator?.language || currentLanguage);
        return;
      }
      const result = await global.chrome.storage.sync.get([
        SETTINGS_STORAGE_KEY,
        LEGACY_SETTINGS_STORAGE_KEY,
        'language'
      ]);
      setLanguage(
        result[SETTINGS_STORAGE_KEY]?.language ||
        result[LEGACY_SETTINGS_STORAGE_KEY]?.language ||
        result.language ||
        currentLanguage
      );
    } catch (_) {
      setLanguage(currentLanguage);
    }
  }

  function listenForLanguageChanges() {
    try {
      if (!global.chrome?.storage?.onChanged) return;
      global.chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== 'sync') return;
        const nextLanguage =
          changes[SETTINGS_STORAGE_KEY]?.newValue?.language ||
          changes[LEGACY_SETTINGS_STORAGE_KEY]?.newValue?.language ||
          changes.language?.newValue;
        if (nextLanguage) setLanguage(nextLanguage);
      });
    } catch (_) {
      // Best effort only.
    }
  }

  function isExtensionPage() {
    return /^chrome-extension:|^moz-extension:/.test(global.location?.protocol || '');
  }

  const api = {
    supportedLanguages: SUPPORTED_LANGUAGES,
    locales: LOCALES,
    catalog: CATALOG,
    get language() {
      return currentLanguage;
    },
    get locale() {
      return getLocale();
    },
    getLanguage: () => currentLanguage,
    getLocale,
    setLanguage,
    t,
    apply,
    observe,
    registerRoot,
    registerEngineCatalog,
    _catalog: CATALOG,
    _technicalUnitNames: TECHNICAL_UNIT_NAMES
  };

  global.HubConverterI18n = api;
  listenForLanguageChanges();

  if ((isExtensionPage() || global.document?.documentElement?.hasAttribute('data-hub-converter-page')) && global.document) {
    const start = () => {
      registerRoot(global.document);
      loadLanguage();
    };
    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }
  } else {
    loadLanguage();
  }
})(globalThis);
