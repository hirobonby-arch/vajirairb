/**
 * VAJIRA IRB - Interactive Application Script
 * Providing interactive controls, search lookup, modal management, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBackToTop();
  initSliderDots();
  initSearchTrigger();
});

// ================= MOBILE NAVIGATION =================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (!menuBtn || !mainNav) return;

  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('mobile-active');
    const icon = menuBtn.querySelector('i');
    if (mainNav.classList.contains('mobile-active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu on clicking any navigation link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('mobile-active')) {
        mainNav.classList.remove('mobile-active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

// ================= BACK TO TOP BUTTON =================
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
    } else {
      backToTopBtn.style.opacity = '0.7';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ================= HERO SLIDER DOTS =================
function initSliderDots() {
  const dots = document.querySelectorAll('.hero-slider-dots .dot');
  if (!dots.length) return;

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
}

// ================= SEARCH TRIGGER IN NAVBAR =================
function initSearchTrigger() {
  const trigger = document.getElementById('searchTrigger');
  const input = document.getElementById('projectSearchInput');
  const target = document.getElementById('status-search');

  if (!trigger || !input || !target) return;

  trigger.addEventListener('click', () => {
    target.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      input.focus();
    }, 400);
  });
}

// ================= PROJECT STATUS DATABASE (SAMPLE REALISTIC DATA) =================
const sampleProjects = {
  'REC-2567-001': {
    code: 'REC-2567-001',
    title: 'การศึกษาประสิทธิผลและความปลอดภัยในการดูแลผู้ป่วยโรคเรื้อรังในเขตเมือง',
    pi: 'ศ.ดร.พญ. วิไล สมบูรณ์เกียรติ',
    department: 'ภาควิชาเวชศาสตร์ชุมชน คณะแพทยศาสตร์วชิรพยาบาล',
    type: 'Full Board Review (การพิจารณาในที่ประชุมใหญ่)',
    statusClass: 'status-approved',
    statusText: 'รับรองจริยธรรมแล้ว (Approved)',
    meeting: 'การประชุมครั้งที่ 10/2567',
    approvalDate: '15 ตุลาคม 2567',
    expireDate: '14 ตุลาคม 2568',
    certDoc: 'COA-2567-001.pdf'
  },
  'REC-2567-042': {
    code: 'REC-2567-042',
    title: 'การเปรียบเทียบคุณภาพชีวิตและผลลัพธ์การฟื้นตัวหลังการผ่าตัดแบบส่องกล้อง',
    pi: 'นพ. ชัยพร เกียรติก้อง',
    department: 'ภาควิชาศัลยศาสตร์ คณะแพทยศาสตร์วชิรพยาบาล',
    type: 'Expedited Review (การพิจารณาแบบเร็ว)',
    statusClass: 'status-reviewing',
    statusText: 'อยู่ระหว่างการพิจารณาของผู้ประเมิน (Under Review)',
    meeting: 'รอบพิจารณาประจำเดือนตุลาคม 2567',
    approvalDate: 'กำลังดำเนินการ (คาดการณ์ 3-5 วันทำการ)',
    expireDate: '-',
    certDoc: 'อยู่ระหว่างออกเอกสาร'
  },
  'IRB-67-105': {
    code: 'IRB-67-105',
    title: 'การสำรวจระดับความรอบรู้ด้านสุขภาพของประชาชนในเขตดุสิต กรุงเทพมหานคร',
    pi: 'พยาบาลวิชาชีพ กานดา ศรีสะอาด',
    department: 'ฝ่ายการพยาบาล โรงพยาบาลวชิรพยาบาล',
    type: 'Exemption Review (การพิจารณาแบบยกเว้น)',
    statusClass: 'status-revision',
    statusText: 'รอแก้ไขตามข้อเสนอแนะ (Revision Required)',
    meeting: 'หนังสือแจ้งผลรอบที่ 9/2567',
    approvalDate: 'รอส่งเล่มแก้ไขภายใน 30 วัน',
    expireDate: '-',
    certDoc: 'โปรดตรวจสอบบันทึกข้อความในอีเมลของท่าน'
  }
};

// Fill search input from quick buttons
function fillSearchExample(code) {
  const input = document.getElementById('projectSearchInput');
  if (input) {
    input.value = code;
    handleStatusSearch(new Event('submit'));
  }
}

// Handle Status Search Form
function handleStatusSearch(event) {
  if (event) event.preventDefault();

  const input = document.getElementById('projectSearchInput');
  const resultBox = document.getElementById('searchResultBox');
  if (!input || !resultBox) return;

  const query = input.value.trim().toUpperCase();
  if (!query) return;

  resultBox.style.display = 'block';

  // Check matching mock database
  const project = sampleProjects[query];

  if (project) {
    resultBox.innerHTML = `
      <div class="result-card-inner">
        <div class="result-header-row">
          <span class="result-id"><i class="fa-solid fa-folder"></i> ${project.code}</span>
          <span class="result-status-pill ${project.statusClass}">
            <i class="fa-solid fa-circle-check"></i> ${project.statusText}
          </span>
        </div>
        <div class="result-name">${project.title}</div>
        <div class="result-meta-grid">
          <div><strong>หัวหน้าโครงการ:</strong> ${project.pi}</div>
          <div><strong>ประเภทการพิจารณา:</strong> ${project.type}</div>
          <div><strong>สังกัด:</strong> ${project.department}</div>
          <div><strong>รอบประชุม/พิจารณา:</strong> ${project.meeting}</div>
          <div><strong>วันที่รับรอง/สถานะ:</strong> ${project.approvalDate}</div>
          <div><strong>วันสิ้นสุดการรับรอง:</strong> ${project.expireDate}</div>
        </div>
        <div style="margin-top: 12px; display: flex; gap: 10px; align-items: center;">
          <a href="https://sites.google.com/nmu.ac.th/vajirairb/status" target="_blank" rel="noopener" class="btn-primary-pill" style="padding: 6px 16px; font-size: 0.85rem;">
            <span>ดูรายงานสถานะฉบับเต็ม</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    `;
  } else {
    // If query not found in direct sample, provide friendly status routing
    resultBox.innerHTML = `
      <div class="result-card-inner">
        <div class="result-header-row">
          <span class="result-id"><i class="fa-solid fa-magnifying-glass"></i> ผลการค้นหาสำหรับ: "${escapeHtml(input.value.trim())}"</span>
          <span class="result-status-pill status-reviewing">
            <i class="fa-solid fa-clock"></i> ตรวจสอบผ่านระบบหลัก
          </span>
        </div>
        <p style="font-size: 0.88rem; color: #4A5568; margin-top: 6px;">
          ระบบกำลังเชื่อมต่อไปยังฐานข้อมูลหลักของสำนักงานคณะกรรมการจริยธรรมการวิจัยในมนุษย์ (Vajira IRB Official Status Portal) เพื่อค้นหาข้อมูลล่าสุด
        </p>
        <div style="margin-top: 10px;">
          <a href="https://sites.google.com/nmu.ac.th/vajirairb/status" target="_blank" rel="noopener" class="btn-primary-pill" style="padding: 8px 18px; font-size: 0.88rem;">
            <span>เปิดหน้าระบบค้นหาสถานะ Vajira IRB</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    `;
  }
}

// Utility to escape HTML
function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(string).replace(/[&<>"']/g, s => entityMap[s]);
}

// ================= TRAINING MODAL =================
function openTrainingModal() {
  const modal = document.getElementById('trainingModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeTrainingModal() {
  const modal = document.getElementById('trainingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTrainingModal();
  }
});
