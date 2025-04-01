// 等待文檔加載完成
document.addEventListener('DOMContentLoaded', function() {
  // 處理行動裝置選單
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // 處理 FAQ 折疊功能
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // 關閉所有其他 FAQ 項目
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // 切換當前項目的狀態
      item.classList.toggle('active');
    });
  });
  
  // 滾動效果
  const scrollElements = document.querySelectorAll('.step, .cabin-card, .testimonial-card');
  
  const elementInView = (el, scrollOffset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      (window.innerHeight || document.documentElement.clientHeight) - scrollOffset
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };
  
  const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };
  
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // 初始檢查
  handleScrollAnimation();
  
  // 平滑滾動到錨點
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 愚人節彩蛋: 點擊主標題時的效果
  const mainTitle = document.querySelector('.hero h1');
  if (mainTitle) {
    mainTitle.addEventListener('click', function() {
      this.textContent = '你準備好被打包了嗎？';
      setTimeout(() => {
        this.textContent = 'ShipMe™ – 重新定義旅行的方式';
      }, 2000);
    });
  }
  
  // 追蹤頁面彩蛋
  const trackingPoint = document.querySelector('.tracking-point');
  if (trackingPoint) {
    trackingPoint.addEventListener('click', function() {
      alert('啊哦，你發現了賣家已出貨的秘密！');
    });
  }
}); 