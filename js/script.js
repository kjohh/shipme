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

  // 處理預約頁面上的身高和體重輸入
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const cabinOptions = document.querySelectorAll('.cabin-option');
  const recommendationElem = document.querySelector('.cabin-recommendation');
  
  if(heightInput && weightInput) {
    const updateCabinRecommendation = () => {
      const height = parseFloat(heightInput.value) || 0;
      const weight = parseFloat(weightInput.value) || 0;
      
      // 移除以前的推薦
      cabinOptions.forEach(cabin => {
        cabin.classList.remove('recommended');
        const recommendedTag = cabin.querySelector('.recommended-tag');
        if (recommendedTag) {
          recommendedTag.remove();
        }
      });
      
      // 只有當兩個值都有輸入時才給出推薦
      if (height > 0 && weight > 0) {
        let recommendedCabin = '';
        
        // 基於身高和體重的簡單推薦邏輯
        if (height <= 165 && weight <= 60) {
          recommendedCabin = 'mini';
        } else if ((height <= 185 && weight <= 90) || (height <= 175 && weight <= 100)) {
          recommendedCabin = 'standard';
        } else {
          recommendedCabin = 'luxury';
        }
        
        // 更新推薦文本
        if (recommendationElem) {
          let recommendationText = '';
          let cabinClass = '';
          
          if (recommendedCabin === 'mini') {
            recommendationText = '基於您的身高體重，我們推薦 <span class="mini">迷你艙</span>';
            cabinClass = 'mini';
          } else if (recommendedCabin === 'standard') {
            recommendationText = '基於您的身高體重，我們推薦 <span class="standard">標準艙</span>';
            cabinClass = 'standard';
          } else {
            recommendationText = '基於您的身高體重，我們推薦 <span class="luxury">豪華艙</span>';
            cabinClass = 'luxury';
          }
          
          recommendationElem.innerHTML = `<p class="recommendation-text">${recommendationText}</p>`;
          recommendationElem.classList.add('pulse-animation');
          
          // 將推薦標籤添加到相應的艙型選項
          cabinOptions.forEach(cabin => {
            if (cabin.getAttribute('data-cabin') === recommendedCabin) {
              cabin.classList.add('recommended');
              
              // 創建推薦標籤
              const tag = document.createElement('div');
              tag.className = 'recommended-tag';
              tag.textContent = '推薦選擇';
              cabin.appendChild(tag);
            }
          });
        }
      } else {
        // 如果沒有輸入足夠的數據，顯示提示
        if (recommendationElem) {
          recommendationElem.innerHTML = '<p class="recommendation-text">請輸入您的身高和體重以獲取艙型推薦</p>';
        }
      }
    };
    
    // 為輸入添加事件監聽器
    heightInput.addEventListener('input', updateCabinRecommendation);
    weightInput.addEventListener('input', updateCabinRecommendation);
    
    // 初始化推薦
    updateCabinRecommendation();
  }
  
  // 處理預約表單步驟
  const bookingForms = document.querySelectorAll('.booking-form');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  
  if(bookingForms.length) {
    // 增強版本的表單步驟切換函數
    const showBookingStep = (stepIndex) => {
      bookingForms.forEach((form, index) => {
        if(index === stepIndex) {
          form.classList.add('active');
          form.style.display = 'block';
          
          // 先設置透明度為0
          form.style.opacity = '0';
          
          // 等待DOM更新後添加動畫
          setTimeout(() => {
            form.style.opacity = '1';
            form.style.transform = 'translateY(0)';
          }, 50);
          
          // 更新步驟指示器
          if(stepIndicators[index]) {
            stepIndicators[index].classList.add('active');
          }
        } else {
          form.classList.remove('active');
          form.style.display = 'none';
          
          // 更新步驟指示器
          if(stepIndicators[index]) {
            stepIndicators[index].classList.remove('active');
          }
        }
      });
      
      // 滾動到頂部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    // 表單驗證函數
    const validateForm = (formIndex) => {
      const currentForm = bookingForms[formIndex];
      const requiredFields = currentForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        // 移除之前的錯誤類
        field.classList.remove('error');
        
        // 檢查字段是否為空
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        }
        
        // 對於數字輸入進行範圍檢查
        if (field.type === 'number' && field.value.trim()) {
          const value = parseFloat(field.value);
          const min = parseFloat(field.getAttribute('min') || -Infinity);
          const max = parseFloat(field.getAttribute('max') || Infinity);
          
          if (value < min || value > max) {
            field.classList.add('error');
            isValid = false;
          }
        }
      });
      
      return isValid;
    };
    
    // 為表單按鈕添加事件監聽器
    nextButtons.forEach((button, index) => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 在前進之前驗證當前表單
        if (validateForm(index)) {
          showBookingStep(index + 1);
        } else {
          // 簡單的提示動畫
          button.classList.add('shake');
          setTimeout(() => {
            button.classList.remove('shake');
          }, 500);
        }
      });
    });
    
    prevButtons.forEach((button, index) => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        showBookingStep(index);
      });
    });
    
    // 初始化顯示第一步
    showBookingStep(0);
  }
  
  // 添加提交前確認
  const bookingCompleteForm = document.querySelector('form[action="booking-complete.html"]');
  if (bookingCompleteForm) {
    bookingCompleteForm.addEventListener('submit', function(e) {
      // 防止默認提交
      e.preventDefault();
      
      // 檢查是否有任何條款未勾選
      const termsCheckbox = document.getElementById('terms');
      const dataCheckbox = document.getElementById('data-processing');
      
      if (termsCheckbox && !termsCheckbox.checked) {
        alert('請同意我們的服務條款和條件以繼續');
        return;
      }
      
      if (dataCheckbox && !dataCheckbox.checked) {
        alert('請同意我們的數據處理政策以繼續');
        return;
      }
      
      // 一切正常，提交表單
      this.submit();
    });
  }
  
  // 添加動態的頁面加載動畫
  const pageContent = document.querySelector('.container');
  if (pageContent) {
    pageContent.style.opacity = '0';
    pageContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      pageContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      pageContent.style.opacity = '1';
      pageContent.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // 創建更多互動元素的動畫效果
  const createRippleEffect = (event) => {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
    circle.classList.add('ripple');
    
    // 移除現有的漣漪效果
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };
  
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRippleEffect);
  });
}); 