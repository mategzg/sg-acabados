export type ProjectShowcase = {
  id: string
  name: string
  sector:
    | 'Oficinas'
    | 'Retail'
    | 'Salud'
    | 'Aeropuertos y transporte'
    | 'Entretenimiento / Cines'
    | 'Oficinas corporativas'
    | 'Deportes / Infraestructura'
    | 'Industrial / Log\u00edstica'
    | 'Residencial'
    | 'Miner\u00eda / Oficinas'
    | 'Miner\u00eda / Mantenimiento'
    | 'Educaci\u00f3n'
    | 'Programas sociales / Gobierno'
    | 'Gobierno municipal'
    | 'Banca'
  location: string
  area: string
  areaM2: number
  timeframe: string
  summary: string
  challenges: string[]
  solution: string[]
  results: string[]
  specialties: string[]
  image: {
    src: string
    alt: string
  }
  href: string
}

export const projectShowcase: ProjectShowcase[] = [
  {
    id: 'jorge-chavez-terminal',
    name: 'Aeropuerto Internacional Jorge Chávez — Ampliación',
    sector: 'Aeropuertos y transporte',
    location: 'Aeropuerto Internacional Jorge Chávez, Lima — Perú',
    area: '—',
    areaM2: 3200,
    timeframe: 'Febrero 2024 – Presente',
    summary: 'Suministro e instalación de tabiquería de drywall para el terminal del proyecto de ampliación.',
    challenges: [
      'Trabajos nocturnos sin cerrar operaciones',
      'Compatibilizar cableado de audio, voz y datos',
      'Control de polvo y limpieza entre turnos'
    ],
    solution: [
      'Suministro e instalación de tabiquería de drywall para el terminal de la ampliación.'
    ],
    results: [
      'Reapertura de salas sin retrasos',
      'Satisfaccion del operador aeroportuario',
      'Reduccion de tiempos de limpieza post turno'
    ],
    specialties: ['Tabiquería drywall'],
    image: {
      src: '/images/proyectos/aeropuerto-jorge-chavez-1.jpg',
      alt: 'Sala de embarque renovada en el aeropuerto Jorge Chavez'
    },
    href: '/cotizar?proyecto=jorge-chavez'
  },
  {
    id: 'cineplanet-cayma',
    name: 'Cineplanet Cayma',
    sector: 'Entretenimiento / Cines',
    location: 'Mall Plaza Arequipa, Av. Ejército — Arequipa',
    area: '—',
    areaM2: 1450,
    timeframe: '— (Año de ejecución: 2001)',
    summary: 'Implementación del sistema total de tabiquería en salas de cine, con muros acústicos y resistentes al fuego y cielo raso acústico negro en 9 salas.',
    challenges: [
      'Plazo fijo previo al estreno de temporada',
      'Coordinacion con mall management para descargas nocturnas',
      'Integracion de butacas motorizadas y audio envolvente'
    ],
    solution: [
      'Suministro e instalación de muros acústicos y muros RF.',
      'Instalación de cielo raso acústico negro en 9 salas.'
    ],
    results: [
      'Apertura en fecha de estreno',
      'Experiencia premium validada por cliente',
      'Reduccion de ruido a salas contiguas'
    ],
    specialties: ['Muros acústicos', 'Muros RF', 'Cielo raso acústico'],
    image: {
      src: '/images/proyectos/cineplanet-cayma-1.jpg',
      alt: 'Sala premium Cineplanet Cayma con iluminacion indirecta'
    },
    href: '/cotizar?proyecto=cineplanet'
  },
  {
    id: 'clinica-arequipa',
    name: 'Clínica Arequipa',
    sector: 'Salud',
    location: 'Arequipa',
    area: '—',
    areaM2: 2100,
    timeframe: '— (Año de ejecución: 2012)',
    summary: 'Implementación del sistema de tabiquería, pisos y carpintería en edificio de 8 pisos.',
    challenges: [
      'Intervencion por etapas con areas en servicio',
      'Validaciones de presion positiva y particulado',
      'Trazabilidad documental para auditorias clinicas'
    ],
    solution: [
      'Suministro e implementación de tabiquería, pisos y carpintería para 8 niveles.'
    ],
    results: [
      'Habilitacion de UCI y salas de procedimientos',
      'Auditoria sanitaria aprobada sin observaciones',
      'Plan de mantenimiento preventivo entregado'
    ],
    specialties: ['Drywall', 'Pisos', 'Carpintería'],
    image: {
      src: '/images/proyectos/clinica-arequipa-1.jpg',
      alt: 'Pasillo clinica Arequipa con acabados sanitarios'
    },
    href: '/cotizar?proyecto=clinica-arequipa'
  },
  {
    id: 'linde-peru-oficinas-administrativas',
    name: 'Linde Per\xfa \u2014 Oficinas Administrativas',
    sector: 'Oficinas corporativas',
    location: 'Parque Industrial, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Noviembre 2022 \u2013 Julio 2023',
    summary: 'Remodelaci\xf3n integral de oficinas con instalaciones sanitarias y el\xe9ctricas, pisos vin\xedlicos y mobiliario.',
    challenges: [
      'Coordinar la remodelaci\xf3n integral manteniendo las operaciones administrativas.',
      'Integrar instalaciones sanitarias y el\xe9ctricas dentro del cronograma extendido.',
      'Personalizar mobiliario y acabados seg\xfan lineamientos corporativos de Linde.'
    ],
    solution: [
      'Implementaci\xf3n de oficinas con suministro e instalaci\xf3n de piso vin\xedlico.',
      'Instalaciones sanitarias y el\xe9ctricas completas.',
      'Instalaci\xf3n de vidrios, mamparas y puertas; pintura; escritorios y credenzas.'
    ],
    results: [
      'Oficinas administrativas entregadas listas para operar.',
      'Sistemas el\xe9ctricos y sanitarios certificados seg\xfan especificaciones.',
      'Mobiliario integrado con la imagen corporativa de Linde Per\xfa.'
    ],
    specialties: [
      'Pisos vin\xedlicos',
      'Mamparas y vidrios',
      'Instalaciones el\xe9ctricas y sanitarias',
      'Mobiliario en melamina',
      'Pintura'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Implementaci\xf3n de oficinas administrativas para Linde Per\xfa'
    },
    href: '/cotizar?proyecto=linde-peru-oficinas-administrativas'
  },
  {
    id: 'videna-control-solar-y-vientos',
    name: 'VIDENA \u2014 Sistema de Control Solar y de Vientos',
    sector: 'Deportes / Infraestructura',
    location: 'San Luis, Lima',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Junio 2019',
    summary: 'Venta e instalaci\xf3n de sistemas de control solar y vientos con celos\xedas de lamas orientables exteriores.',
    challenges: [
      'Compatibilizar las nuevas celos\xedas con la estructura existente de VIDENA.',
      'Instalar sistemas de control solar en fachadas de gran altura.',
      'Cumplir con los lineamientos arquitect\xf3nicos del legado deportivo.'
    ],
    solution: [
      'Suministro e instalaci\xf3n de sistemas de control solar y vientos.',
      'Celos\xedas de lamas orientables exteriores regulables.'
    ],
    results: [
      'Control de radiaci\xf3n solar y de corrientes de viento en \xe1reas deportivas.',
      'Mejora del confort t\xe9rmico en ambientes estrat\xe9gicos de VIDENA.',
      'Entrega aprobada por la administraci\xf3n del complejo deportivo.'
    ],
    specialties: [
      'Control solar',
      'Celos\xedas orientables'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Celos\xedas orientables instaladas en la VIDENA'
    },
    href: '/cotizar?proyecto=videna-control-solar-y-vientos'
  },
  {
    id: 'agrega-city-center-oficinas',
    name: 'AGREGA \u2014 City Center (Oficinas Administrativas)',
    sector: 'Oficinas corporativas',
    location: 'Cerro Colorado, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2019',
    summary: 'Implementaci\xf3n total de oficinas administrativas y venta de mobiliario.',
    challenges: [
      'Implementar oficinas completas en un edificio en operaci\xf3n.',
      'Gestionar la fabricaci\xf3n de mobiliario a medida en plazos ajustados.',
      'Coordinar entregas para asegurar continuidad de las \xe1reas administrativas.'
    ],
    solution: [
      'Implementaci\xf3n total de oficinas.',
      'Venta e instalaci\xf3n de mobiliario.'
    ],
    results: [
      'Oficinas administrativas listas para ocupar en City Center.',
      'Mobiliario instalado alineado al branding de AGREGA.',
      'Entrega dentro del presupuesto y cronograma acordado.'
    ],
    specialties: [
      'Implementaci\xf3n de oficinas',
      'Mobiliario'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: '\xc1reas administrativas implementadas para AGREGA en City Center'
    },
    href: '/cotizar?proyecto=agrega-city-center-oficinas'
  },
  {
    id: 'yara-peru-almacenes-matarani',
    name: 'Yara Per\xfa \u2014 Almacenes Matarani',
    sector: 'Industrial / Log\xedstica',
    location: 'Islay, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2019',
    summary: 'Trabajos de mantenimiento en infraestructura de almacenes del puerto de Matarani.',
    challenges: [
      'Realizar mantenimiento sin interrumpir operaciones log\xedsticas del puerto.',
      'Trabajar en estructuras expuestas a ambientes corrosivos.',
      'Coordinar maniobras en altura cumpliendo protocolos de seguridad industrial.'
    ],
    solution: [
      'Mantenimiento de hangar con desmontaje y montaje de estructuras y cerco perim\xe9trico.',
      'Mantenimiento de canaletas y de \xe1rea de servicios higi\xe9nicos.'
    ],
    results: [
      'Infraestructura de almacenes puesta a punto y operativa.',
      'Cerco perim\xe9trico reforzado para mayor seguridad.',
      'Sistemas de drenaje y servicios higi\xe9nicos optimizados.'
    ],
    specialties: [
      'Mantenimiento industrial',
      'Cerco perim\xe9trico',
      'Canaletas',
      'Servicios higi\xe9nicos'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Mantenimiento en almacenes de Yara Per\xfa en Matarani'
    },
    href: '/cotizar?proyecto=yara-peru-almacenes-matarani'
  },
  {
    id: 'edificio-luxus-piso-anacaspi',
    name: 'Edificio Luxus \u2014 Piso Anacaspi (Yanahuara)',
    sector: 'Residencial',
    location: 'Av. Bolognesi 337, Yanahuara, Arequipa',
    area: '1 200 m2',
    areaM2: 1200,
    timeframe: 'Agosto 2023',
    summary: 'Suministro e instalaci\xf3n de piso de madera Anacaspi en edificio residencial.',
    challenges: [
      'Coordinar instalaci\xf3n de pisos de madera en 11 departamentos habitados.',
      'Mantener uniformidad de acabado en cada unidad residencial.',
      'Proteger las superficies durante el proceso de instalaci\xf3n y acabado.'
    ],
    solution: [
      'Suministro e instalaci\xf3n de piso Anacaspi en 11 departamentos.',
      'Instalaci\xf3n de accesorios y tapajuntas.'
    ],
    results: [
      'Departamentos entregados con piso de madera Anacaspi de alto est\xe1ndar.',
      'Terminaciones con accesorios y tapajuntas perfectamente alineados.',
      'Clientes residenciales satisfechos con la calidad y tiempos de instalaci\xf3n.'
    ],
    specialties: [
      'Pisos de madera',
      'Accesorios y tapajuntas'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Instalaci\xf3n de piso de madera Anacaspi en Edificio Luxus'
    },
    href: '/cotizar?proyecto=edificio-luxus-piso-anacaspi'
  },
  {
    id: 'rio-alto-residencial',
    name: 'R\xedo Alto \u2014 Residencial',
    sector: 'Residencial',
    location: 'Cayma',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2018',
    summary: 'Venta e instalaci\xf3n de piso s\xf3lido para proyecto residencial, m\xe1s ventanas termoac\xfasticas.',
    challenges: [
      'Seleccionar pisos s\xf3lidos adecuados al clima de altura en Arequipa.',
      'Instalar ventanas termoac\xfasticas sin afectar la envolvente del edificio.',
      'Coordinar trabajos simult\xe1neos en unidades residenciales habitadas.'
    ],
    solution: [
      'Venta e instalaci\xf3n de piso s\xf3lido.',
      'Ventanas termoac\xfasticas.'
    ],
    results: [
      'Viviendas con mejor confort t\xe9rmico y ac\xfastico.',
      'Pisos s\xf3lidos instalados con acabados uniformes.',
      'Entregas realizadas seg\xfan planificaci\xf3n del cliente residencial.'
    ],
    specialties: [
      'Pisos s\xf3lidos',
      'Ventanas termoac\xfasticas'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Acabados residenciales instalados en proyecto R\xedo Alto'
    },
    href: '/cotizar?proyecto=rio-alto-residencial'
  },
  {
    id: 'acv-oficinas-cayma',
    name: 'Asociaci\xf3n Cerro Verde \u2014 Oficinas ACV (Cayma)',
    sector: 'Miner\xeda / Oficinas',
    location: 'Cayma, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Noviembre 2016 \u2013 Abril 2017',
    summary: 'Ampliaci\xf3n, implementaci\xf3n y acondicionamiento interno de edificio de oficinas.',
    challenges: [
      'Ampliar la infraestructura dentro de cronogramas exigentes de la minera.',
      'Coordinar m\xfaltiples especialidades en un edificio con operaciones activas.',
      'Cumplir est\xe1ndares de seguridad industrial durante toda la obra.'
    ],
    solution: [
      'Ampliaci\xf3n e implementaci\xf3n de infraestructura.',
      'Acondicionamiento integral de oficinas.'
    ],
    results: [
      'Edificio administrativo ampliado y listo para nuevos equipos.',
      'Espacios de trabajo optimizados para operaciones de Cerro Verde.',
      'Entrega validada por los responsables HSE de la minera.'
    ],
    specialties: [
      'Infraestructura interior',
      'Acondicionamiento de oficinas'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Acondicionamiento de oficinas para Asociaci\xf3n Cerro Verde'
    },
    href: '/cotizar?proyecto=acv-oficinas-cayma'
  },
  {
    id: 'tecsup-auditorio-arequipa',
    name: 'TECSUP \u2014 Auditorio (Sede Arequipa)',
    sector: 'Educaci\xf3n',
    location: 'Jos\xe9 Luis Bustamante y Rivero, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2017',
    summary: 'Construcci\xf3n de auditorio con tabiquer\xeda, cielos rasos, recubrimiento de pisos, butacas e iluminaci\xf3n.',
    challenges: [
      'Construir un auditorio en campus activo sin interrumpir clases.',
      'Coordinar butacas e iluminaci\xf3n con requerimientos ac\xfasticos.',
      'Cumplir el cronograma acad\xe9mico establecido por TECSUP.'
    ],
    solution: [
      'Tabiquer\xeda de muros laterales y cielo raso.',
      'Recubrimiento de pisos e instalaci\xf3n de butacas e iluminaci\xf3n.'
    ],
    results: [
      'Auditorio entregado listo para eventos institucionales.',
      'Confort ac\xfastico y visual logrado seg\xfan especificaciones.',
      'Obra culminada dentro del calendario acad\xe9mico.'
    ],
    specialties: [
      'Tabiquer\xeda',
      'Cielo raso',
      'Pisos',
      'Butacas',
      'Iluminaci\xf3n'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Auditorio de TECSUP equipado con butacas e iluminaci\xf3n'
    },
    href: '/cotizar?proyecto=tecsup-auditorio-arequipa'
  },
  {
    id: 'minera-antares-edificio-nasya',
    name: 'Minera Antares \u2014 Edificio NASYA (Nuevas Oficinas)',
    sector: 'Miner\xeda / Oficinas',
    location: 'Parque Industrial, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Febrero 2012 \u2013 Junio 2012',
    summary: 'Dise\xf1o, modulaci\xf3n e implementaci\xf3n de oficinas con mobiliario a medida, iluminaci\xf3n y drywall.',
    challenges: [
      'Integrar dise\xf1o y construcci\xf3n dentro de un cronograma ajustado.',
      'Coordinar m\xfaltiples acabados en un entorno industrial.',
      'Mantener operativas las \xe1reas existentes durante traslados.'
    ],
    solution: [
      'Dise\xf1o y modulaci\xf3n de oficinas con traslado y modificaci\xf3n de mobiliario.',
      'Fabricaci\xf3n de mobiliario y tabiquer\xeda con pintura total.',
      'Instalaci\xf3n de mamparas de vidrio templado y barandas de aluminio.'
    ],
    results: [
      'Nuevas oficinas operativas para Minera Antares.',
      'Imagen corporativa reforzada con mobiliario a medida.',
      'Iluminaci\xf3n y tabiquer\xeda entregadas sin retrabajos.'
    ],
    specialties: [
      'Tabiquer\xeda drywall y pintura',
      'Mamparas de vidrio templado',
      'Barandas de aluminio',
      'Mobiliario en melamina',
      'Iluminaci\xf3n'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Nuevas oficinas NASYA para Minera Antares'
    },
    href: '/cotizar?proyecto=minera-antares-edificio-nasya'
  },
  {
    id: 'icpna-sala-profesores-arequipa',
    name: 'ICPNA \u2014 Sala de Profesores (Arequipa)',
    sector: 'Educaci\xf3n',
    location: 'Cercado, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2012',
    summary: 'Remodelaci\xf3n completa de sala docente con carpinter\xeda, vidrios, mobiliario e instalaciones el\xe9ctricas.',
    challenges: [
      'Renovar la sala de profesores durante el calendario acad\xe9mico.',
      'Coordinar carpinter\xeda, vidrios e instalaciones el\xe9ctricas en un solo frente.',
      'Optimizar iluminaci\xf3n y mobiliario para uso intensivo del personal docente.'
    ],
    solution: [
      'Remodelaci\xf3n integral de sala de profesores.',
      'Carpinter\xeda, vidrios, mobiliario e instalaciones el\xe9ctricas.'
    ],
    results: [
      'Sala de profesores modernizada y funcional.',
      'Mobiliario y acabados alineados a la identidad institucional.',
      'Personal docente con un ambiente c\xf3modo y eficiente.'
    ],
    specialties: [
      'Carpinter\xeda',
      'Vidrios',
      'Mobiliario',
      'Instalaciones el\xe9ctricas',
      'Mantenimiento general'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Sala de profesores del ICPNA renovada en Arequipa'
    },
    href: '/cotizar?proyecto=icpna-sala-profesores-arequipa'
  },
  {
    id: 'puesto-salud-congata-ampliacion',
    name: 'Puesto de Salud Congata \u2014 Ampliaci\xf3n',
    sector: 'Salud',
    location: 'Uchumayo, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Abril 2011 \u2013 Julio 2011',
    summary: 'Ejecuci\xf3n y ampliaci\xf3n de infraestructura con trabajos de instalaciones, acabados y equipamiento base.',
    challenges: [
      'Ampliar el puesto de salud manteniendo la atenci\xf3n a la comunidad.',
      'Integrar instalaciones sanitarias y el\xe9ctricas en estructuras existentes.',
      'Coordinar m\xfaltiples oficios en un proyecto periurbano.'
    ],
    solution: [
      'Suministro e instalaci\xf3n de vidrios y piso vin\xedlico.',
      'Instalaciones sanitarias y el\xe9ctricas; pintura total con policarbonato y farolas.',
      'Carpinter\xeda met\xe1lica y de madera.'
    ],
    results: [
      'Puesto de salud ampliado con ambientes funcionales.',
      'Infraestructura sanitaria en cumplimiento con normas del MINSA.',
      'Proyecto entregado dentro del cronograma acordado.'
    ],
    specialties: [
      'Vidrios',
      'Instalaciones sanitarias y el\xe9ctricas',
      'Pintura',
      'Policarbonato y farolas',
      'Carpinter\xeda met\xe1lica y de madera',
      'Piso vin\xedlico'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Ampliaci\xf3n del Puesto de Salud Congata en Arequipa'
    },
    href: '/cotizar?proyecto=puesto-salud-congata-ampliacion'
  },
  {
    id: 'comedores-populares-315-unidades',
    name: 'Comedores Populares \u2014 Mejora e Implementaci\xf3n (315 unidades)',
    sector: 'Programas sociales / Gobierno',
    location: 'Jos\xe9 Luis Bustamante y Rivero, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Enero 2010 \u2013 Julio 2010',
    summary: 'Fabricaci\xf3n y suministro de mobiliario para la red de comedores populares.',
    challenges: [
      'Fabricar mobiliario en serie manteniendo calidad homog\xe9nea.',
      'Coordinar entregas simult\xe1neas para 315 comedores.',
      'Optimizar la log\xedstica de distribuci\xf3n en m\xfaltiples distritos.'
    ],
    solution: [
      'Fabricaci\xf3n de 315 armarios con estructura met\xe1lica y melamina.',
      'Fabricaci\xf3n de 315 mesas y bancas para comedor.'
    ],
    results: [
      'Red de comedores equipada con mobiliario durable.',
      'Entrega progresiva cumplida sin retrasos.',
      'Espacios optimizados gracias al dise\xf1o modular entregado.'
    ],
    specialties: [
      'Fabricaci\xf3n de armarios',
      'Mesas con tablero enchapado',
      'Bancas'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Mobiliario entregado para comedores populares en Arequipa'
    },
    href: '/cotizar?proyecto=comedores-populares-315-unidades'
  },
  {
    id: 'registro-civil-mpa',
    name: 'Oficina de Registro Civil \u2014 Municipalidad Provincial de Arequipa',
    sector: 'Gobierno municipal',
    location: 'El Filtro 501, Cercado, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Noviembre 2009 \u2013 Febrero 2010',
    summary: 'Mejoramiento integral del servicio de la oficina con remodelaci\xf3n total y nuevos sistemas de archivo.',
    challenges: [
      'Modernizar la oficina sin interrumpir la atenci\xf3n al ciudadano.',
      'Implementar archivos m\xf3viles en espacios reducidos.',
      'Coordinar acabados y mobiliario con cronogramas municipales.'
    ],
    solution: [
      'Remodelaci\xf3n integral de la oficina de registro civil.',
      'Implementaci\xf3n de mobiliario y archivos m\xf3viles.'
    ],
    results: [
      'Servicio de registro civil optimizado y actualizado.',
      'Mayor capacidad de archivo gracias a sistemas m\xf3viles.',
      'Espacios renovados alineados a los est\xe1ndares de la municipalidad.'
    ],
    specialties: [
      'Remodelaci\xf3n integral',
      'Mobiliario',
      'Archivos m\xf3viles'
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Oficina de Registro Civil renovada en la Municipalidad de Arequipa'
    },
    href: '/cotizar?proyecto=registro-civil-mpa'
  },
  {
    id: 'mibanco-agencia-canto-grande',
    name: 'Mi Banco \u2014 Agencia Canto Grande (Lima)',
    sector: 'Banca',
    location: 'San Juan de Lurigancho, Lima',
    area: '\u2014',
    areaM2: 0,
    timeframe: 'Junio 2007 \u2013 Agosto 2007',
    summary: 'Remodelaci\xf3n de agencia bancaria con obras civiles, mobiliario e instalaciones.',
    challenges: [
      'Actualizar la agencia bancaria sin interrumpir la operaci\xf3n diaria.',
      'Coordinar instalaciones el\xe9ctricas, comunicaciones y sanitarias dentro del cronograma.',
      'Integrar mobiliario especial cumpliendo lineamientos corporativos de Mi Banco.'
    ],
    solution: [
      'Obras civiles y mobiliario especial.',
      'Instalaciones el\xe9ctricas, comunicaciones y sanitarias; se\xf1al\xe9tica.'
    ],
    results: [
      'Agencia Mi Banco reabierta dentro del cronograma.',
      'Infraestructura el\xe9ctrica y de comunicaciones certificadas para operaci\xf3n continua.',
      'Mobiliario y se\xf1al\xe9tica alineados a la imagen corporativa.'
    ],
    specialties: [
      'Obras civiles',
      'Muebles especiales',
      'Instalaciones el\xe9ctricas/comunicaciones',
      'Instalaciones sanitarias',
      'Letreros'
    ],
    image: {
      src: '/images/proyectos/mibanco-agencia-canto-grande-1.webp',
      alt: 'Remodelaci\xf3n de la agencia Mi Banco en Canto Grande'
    },
    href: '/cotizar?proyecto=mibanco-agencia-canto-grande'
  },
  {
    id: 'mibanco-agencia-cayma',
    name: 'Mi Banco \u2014 Agencia Cayma (Arequipa)',
    sector: 'Banca',
    location: 'Cayma, Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '\u2014',
    summary: 'Remodelaci\xf3n de agencia bancaria.',
    challenges: [
      'Adaptar la agencia a los est\xe1ndares corporativos en un local existente.',
      'Coordinar obras en una zona comercial con tr\xe1nsito continuo.',
      'Mantener la seguridad bancaria durante la remodelaci\xf3n.'
    ],
    solution: [
      'Remodelaci\xf3n de agencia.'
    ],
    results: [
      'Espacios de atenci\xf3n modernizados para clientes Mi Banco.',
      'Imagen corporativa replicada en la sede Cayma.',
      'Proyecto ejecutado sin afectar operaciones esenciales.'
    ],
    specialties: [],
    image: {
      src: '/images/proyectos/mibanco-agencia-cayma-1.webp',
      alt: 'Remodelaci\xf3n de la agencia Mi Banco en Cayma'
    },
    href: '/cotizar?proyecto=mibanco-agencia-cayma'
  },
  {
    id: 'clinica-san-juan-de-dios-aire-acondicionado',
    name: 'Cl\xednica San Juan de Dios \u2014 Sistema de A/A',
    sector: 'Salud',
    location: 'Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2011',
    summary: 'Reposici\xf3n y reemplazo del sistema de aire acondicionado en todas las \xe1reas de la cl\xednica.',
    challenges: [
      'Renovar el sistema de aire acondicionado en \xe1reas cr\xedticas en operaci\xf3n.',
      'Coordinar trabajos hospitalarios con ventanas de intervenci\xf3n restringidas.',
      'Garantizar condiciones de control t\xe9rmico y salubridad tras la instalaci\xf3n.'
    ],
    solution: [
      'Implementaci\xf3n completa del sistema de aire acondicionado.'
    ],
    results: [
      'Cl\xednica con climatizaci\xf3n restablecida en todas las \xe1reas.',
      'Mayor confort para pacientes y personal asistencial.',
      'Sistema de aire acondicionado entregado con pruebas y balanceo documentado.'
    ],
    specialties: [
      'Aire acondicionado'
    ],
    image: {
      src: '/images/proyectos/clinica-san-juan-de-dios-aire-acondicionado-1.webp',
      alt: 'Sistema de aire acondicionado instalado en la Cl\xednica San Juan de Dios'
    },
    href: '/cotizar?proyecto=clinica-san-juan-de-dios-aire-acondicionado'
  },
  {
    id: 'universidad-andina-sicuani',
    name: 'Universidad Andina \u2014 Sicuani (Cusco)',
    sector: 'Educaci\xf3n',
    location: 'Sicuani, Canchis  Cusco',
    area: '\u2014',
    areaM2: 0,
    timeframe: '\u2014',
    summary: 'Implementaci\xf3n de tabiquer\xeda en drywall y acabados al interior del nuevo edificio universitario.',
    challenges: [
      'Ejecutar tabiquer\xeda drywall en un edificio universitario a\xfan en obra gruesa.',
      'Cumplir requerimientos ac\xfasticos y de resistencia para aulas y oficinas.',
      'Sincronizar acabados con el cronograma de apertura acad\xe9mica.'
    ],
    solution: [
      'Sistema de tabiquer\xeda drywall y acabados interiores.'
    ],
    results: [
      'Ambientes acad\xe9micos listos para equipamiento y mobiliario.',
      'Acabados interiores uniformes en todo el edificio.',
      'Entrega dentro de los plazos establecidos por la universidad.'
    ],
    specialties: [
      'Tabiquer\xeda drywall',
      'Acabados interiores'
    ],
    image: {
      src: '/images/proyectos/universidad-andina-sicuani-1.webp',
      alt: 'Implementaci\xf3n interior en la Universidad Andina de Sicuani'
    },
    href: '/cotizar?proyecto=universidad-andina-sicuani'
  },
  {
    id: 'cerro-verde-sujecion-chancadora',
    name: 'Cerro Verde \u2014 Sistema de Sujeci\xf3n (Chancadora primaria y terciaria)',
    sector: 'Miner\xeda / Mantenimiento',
    location: 'Arequipa',
    area: '\u2014',
    areaM2: 0,
    timeframe: '2007',
    summary: 'Mantenimiento por rotura del sistema de sujeci\xf3n, con perforaci\xf3n de losa, reinstalaciones y refuerzos.',
    challenges: [
      'Intervenir chancadoras primarias y terciarias sin detener la producci\xf3n minera.',
      'Gestionar maniobras de gran peso en ambientes industriales activos.',
      'Asegurar refuerzos estructurales duraderos frente a futuras solicitaciones.'
    ],
    solution: [
      'Perforaci\xf3n de losa de 3 m con concreto armado.',
      'Reinstalaci\xf3n de fijaciones de la chancadora primaria y refuerzo externo preventivo.'
    ],
    results: [
      'Sistema de sujeci\xf3n restablecido para chancadoras primaria y terciaria.',
      'Refuerzos estructurales validados por el equipo de ingenier\xeda de Cerro Verde.',
      'Reactivaci\xf3n segura de la l\xednea de trituraci\xf3n sin incidentes.'
    ],
    specialties: [
      'Obra civil industrial',
      'Refuerzos'
    ],
    image: {
      src: '/images/proyectos/cerro-verde-sujecion-chancadora-1.webp',
      alt: 'Refuerzo del sistema de sujeci\xf3n en chancadora de Cerro Verde'
    },
    href: '/cotizar?proyecto=cerro-verde-sujecion-chancadora'
  }

]

