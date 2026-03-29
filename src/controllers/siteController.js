const vehicles = [
  {
    slug: '2021-subaru-outback',
    year: 2021,
    make: 'Subaru',
    model: 'Outback Premium',
    type: 'Adventure SUV',
    price: '$27,995',
    mileage: '32,418 miles',
    transmission: 'CVT automatic',
    fuel: 'Gasoline',
    tag: 'Featured',
    themeClass: 'theme-blue',
    highlight: 'All-wheel drive confidence for every season.',
    description: 'A versatile crossover with modern safety features, roomy seating, and weekend-ready cargo space.',
    overview: 'This Outback is ideal for drivers who want dependable traction, everyday comfort, and a cabin built for both commuting and road trips.',
    features: ['Symmetrical all-wheel drive', 'Adaptive cruise control', 'Heated front seats', 'Apple CarPlay and Android Auto'],
  },
  {
    slug: '2020-honda-accord',
    year: 2020,
    make: 'Honda',
    model: 'Accord Sport',
    type: 'Midsize Sedan',
    price: '$24,480',
    mileage: '41,902 miles',
    transmission: '10-speed automatic',
    fuel: 'Gasoline',
    tag: 'Best value',
    themeClass: 'theme-orange',
    highlight: 'Smart design with a smooth and efficient ride.',
    description: 'A balanced sedan that combines strong fuel economy, modern tech, and a polished cabin for daily driving.',
    overview: 'The Accord Sport delivers dependable performance and a spacious interior, making it a practical choice for commuting and family travel.',
    features: ['Remote engine start', 'Dual-zone climate control', 'Blind spot monitoring', '8-inch touchscreen display'],
  },
  {
    slug: '2022-toyota-rav4',
    year: 2022,
    make: 'Toyota',
    model: 'RAV4 XLE',
    type: 'Compact SUV',
    price: '$29,950',
    mileage: '18,777 miles',
    transmission: '8-speed automatic',
    fuel: 'Hybrid',
    tag: 'Low mileage',
    themeClass: 'theme-green',
    highlight: 'Efficiency and flexibility wrapped into one popular SUV.',
    description: 'A fuel-conscious SUV with flexible cargo room, intuitive driver assists, and a comfortable elevated seating position.',
    overview: 'This RAV4 XLE is well suited to busy families and active drivers who want efficiency without giving up utility or comfort.',
    features: ['Toyota Safety Sense', 'Power liftgate', 'Lane tracing assist', 'Smart key with push-button start'],
  },
];

const stats = [
  { value: '150+', label: 'Vehicles inspected and ready' },
  { value: '4.9/5', label: 'Average customer satisfaction' },
  { value: '48 hrs', label: 'Fast turnaround on approvals' },
];

const highlights = [
  {
    title: 'Transparent pricing',
    copy: 'Straightforward vehicle details and pricing with no guesswork.',
  },
  {
    title: 'Quality you can trust',
    copy: 'Every vehicle is reviewed for reliability, comfort, and daily performance.',
  },
  {
    title: 'Friendly buying experience',
    copy: 'Browse, compare, and schedule a visit with a process built around drivers.',
  },
];

function buildHomeViewModel() {
  return {
    title: 'Home',
    hero: {
      eyebrow: 'Used cars made easy',
      heading: 'A better place to find your next dependable vehicle.',
      copy: 'Driven Dealership brings together clean listings, honest information, and a polished shopping experience.',
    },
    highlights,
    stats,
    featuredVehicles: vehicles,
  };
}

function getVehicleBySlug(slug) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function buildHome(req, res) {
  res.render('pages/home', buildHomeViewModel());
}

export function buildInventory(req, res) {
  res.render('pages/vehicles', {
    title: 'Inventory',
    vehicles,
  });
}

export function buildVehicleDetail(req, res) {
  const vehicle = getVehicleBySlug(req.params.slug);

  if (!vehicle) {
    return res.status(404).render('pages/vehicle-detail', {
      title: 'Vehicle Not Found',
      vehicle: null,
    });
  }

  return res.render('pages/vehicle-detail', {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    vehicle,
  });
}

export function buildLogin(req, res) {
  res.render('pages/login', {
    title: 'Sign In',
  });
}