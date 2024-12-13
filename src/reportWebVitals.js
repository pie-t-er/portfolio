import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

// Web Vitals function
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry); // CLS
    getFID(onPerfEntry); // FID
    getLCP(onPerfEntry); // LCP
    getTTFB(onPerfEntry); // TTFB
  }
};

export default reportWebVitals;
