function DownloadResume() {
  return (
    <div className="text-center mt-8">
      <a 
        href="/assets/Resume.pdf" 
        download="Pieter_Alley_Resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-brand-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-brand-secondary transition duration-300"
      >
        Download My Resume
      </a>
    </div>
  );
}

export default DownloadResume;
