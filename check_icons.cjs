const l = require('./node_modules/lucide-react');
const icons = ['Handshake', 'Flame', 'Sparkles', 'TrendingUp', 'Lightbulb', 'Package', 'UserCheck', 'Target', 'Heart', 'Trophy'];
icons.forEach(n => console.log(n, n in l ? 'EXISTS' : 'MISSING'));
