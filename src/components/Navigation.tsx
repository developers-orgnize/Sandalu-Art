import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 right-0 z-40 p-8 md:p-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-4 md:gap-8">
        {links.map((link, index) => (
          <div key={link.path} className="flex items-center gap-4 md:gap-8">
            <Link
              to={link.path}
              className={`nav-link text-xs md:text-sm ${
                location.pathname === link.path ? 'nav-link-active' : ''
              }`}
            >
              {link.label}
            </Link>
            {index < links.length - 1 && (
              <span className="text-muted-foreground">›</span>
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
