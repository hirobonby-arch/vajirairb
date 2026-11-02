/**
 * VAJIRA IRB - Interactive Application Script
 * Providing interactive controls, search lookup, modal management, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBackToTop();
  initSliderDots();
  initSearchTrigger();
  initResearcherWizard();
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

// ================= SECTION 1: RESEARCHER TOOLS (WIZARD & FORM TABS) =================
function initResearcherWizard() {
  const activeCard = document.querySelector('.wizard-opt-card.active');
  if (activeCard) {
    selectWizardType('exemption', activeCard);
  }
}

const wizardData = {
  'exemption': {
    title: 'การพิจารณาแบบยกเว้น (Exemption Review)',
    badgeText: 'Exemption Review',
    badgeClass: 'badge-exemption',
    timeText: 'ประมาณ 5 - 7 วันทำการ (ไม่ต้องรอรอบประชุม)',
    description: 'เหมาะสำหรับโครงการวิจัยที่มีความเสี่ยงไม่เกินระดับต่ำสุด (Minimal Risk) เช่น งานวิจัยที่ใช้ข้อมูลเวชระเบียนย้อนหลัง หรือสิ่งส่งตรวจชีวภาพเดิมที่เหลือจากการตรวจรักษา โดยไม่สามารถระบุตัวตนของผู้ป่วยได้ (De-identified data)',
    points: [
      'ไม่มีการเก็บข้อมูลเพิ่มเติมหรือสัมผัสตัวผู้ป่วยโดยตรง',
      'ข้อมูลที่นำมาบันทึกต้องตัดรหัสที่สามารถเชื่อมโยงกลับไปยังตัวตน (เช่น ชื่อ-สกุล, เลข HN, เลขบัตร ปชช.) ออกทั้งหมด',
      'ต้องจัดทำแบบคำขอขอยกเว้นการขอความยินยอม (Waiver of Informed Consent) ควบคู่กับแบบบันทึกข้อมูล (CRF)'
    ],
    forms: [
      'FM-01 แบบเสนอโครงการวิจัย',
      'FM-05 แบบขอยกเว้น Informed Consent',
      'CRF แบบบันทึกตัวแปรที่จัดเก็บ',
      'โครงร่างการวิจัย (Proposal)'
    ],
    dlTab: 'chart-review'
  },
  'survey': {
    title: 'การพิจารณาแบบยกเว้น / ความเสี่ยงต่ำสุด (Exemption / Minimal Risk)',
    badgeText: 'Exemption / Minimal Risk',
    badgeClass: 'badge-exemption',
    timeText: 'ประมาณ 7 - 10 วันทำการ (ยื่นได้ตลอดทุกวันทำการ)',
    description: 'เหมาะสำหรับงานวิจัยเชิงสำรวจ แบบสอบถาม สัมภาษณ์ หรือศึกษาพฤติกรรมในบุคคลทั่วไป ที่ไม่มีคำถามในประเด็นอ่อนไหวและไม่ก่อให้เกิดผลกระทบทางจิตใจ สังคม หรือกฎหมายต่ออาสาสมัคร',
    points: [
      'แบบสอบถามต้องไม่บันทึกข้อมูลที่ระบุตัวตนผู้ตอบ (Anonymous Survey)',
      'มีเอกสารชี้แจงวัตถุประสงค์และระบุสิทธิของอาสาสมัครในการเลือกตอบหรือไม่ตอบได้อย่างอิสระ',
      'การกด "ยอมรับ" ใน Google Forms หรือการส่งแบบสอบถามกลับถือเป็นการให้ความยินยอมโดยปริยาย'
    ],
    forms: [
      'FM-01 แบบเสนอโครงการวิจัย',
      'ICF-SURVEY เอกสารชี้แจงอาสาสมัคร',
      'ชุดคำถาม/แบบสอบถามฉบับจริงทุกข้อ',
      'คู่มือการวิจัยและเอกสารแนบ'
    ],
    dlTab: 'survey'
  },
  'expedited': {
    title: 'การพิจารณาแบบเร็ว (Expedited Review)',
    badgeText: 'Expedited Review',
    badgeClass: 'badge-expedited',
    timeText: 'ประมาณ 15 - 20 วันทำการ (ยื่นได้ตลอดทุกวันทำการ)',
    description: 'เหมาะสำหรับโครงการวิจัยที่มีความเสี่ยงต่ำ โดยมีการเก็บสิ่งส่งตรวจที่ไม่รุกล้ำ เช่น เจาะเลือดในปริมาณปลอดภัย (ผู้ใหญ่ไม่เกิน 50 มล.), เก็บน้ำลาย, ปัสสาวะ, การตรวจคลื่นไฟฟ้าหัวใจ (ECG), อัลตราซาวด์ หรือการทดสอบสมรรถภาพทางกายภาพทั่วไป',
    points: [
      'กรรมการผู้เชี่ยวชาญ 2-3 ท่านร่วมประเมิน โดยไม่ต้องรอรอบเข้าที่ประชุมใหญ่',
      'ต้องมีเอกสารชี้แจงอาสาสมัคร (ICF) และหนังสือแสดงความยินยอมเป็นลายลักษณ์อักษรที่เข้าใจง่าย',
      'หากมีข้อเสนอแนะในการแก้ไข สำนักงานจะออกหนังสือแจ้งทางอีเมลเพื่อให้นักวิจัยปรับปรุง'
    ],
    forms: [
      'FM-01 แบบเสนอโครงการวิจัย',
      'ICF เอกสารชี้แจงและแสดงความยินยอม',
      'VIRB Smart Checklist ตรวจสอบเอกสาร',
      'ประวัติผู้วิจัยและใบรับรอง GCP/HSP'
    ],
    dlTab: 'specimen'
  },
  'fullboard': {
    title: 'การพิจารณาในที่ประชุมใหญ่ (Full Board Review)',
    badgeText: 'Full Board Review',
    badgeClass: 'badge-fullboard',
    timeText: 'ตามรอบประชุมประจำเดือน (ยื่นก่อนวันที่ 15 ของเดือน)',
    description: 'สำหรับงานวิจัยที่มีความเสี่ยงมากกว่าระดับต่ำสุด (More than minimal risk) ได้แก่ การทดลองยา วัคซีน สารเคมี อุปกรณ์การแพทย์ใหม่ การผ่าตัดหรือหัตถการใหม่ หรือการวิจัยในกลุ่มเปราะบาง (เด็ก, ผู้ป่วยวิกฤต, หญิงตั้งครรภ์, ผู้ต้องขัง)',
    points: [
      'โครงการต้องนำเข้าพิจารณาในการประชุมคณะกรรมการชุดใหญ่ประจำเดือน (สัปดาห์ที่ 4 ของเดือน)',
      'มีคณะกรรมการหลากหลายสาขาทั้งแพทย์ เภสัชกร นักวิทยาศาสตร์ นักกฎหมาย และผู้แทนภาคประชาชนร่วมอภิปราย',
      'ต้องมีแผนการดูแลรักษาความปลอดภัย แผนประกันภัย และการรายงานเหตุการณ์ไม่พึงประสงค์ (SAE) อย่างเข้มงวด'
    ],
    forms: [
      'FM-01-FULL แบบเสนอโครงการฉบับเต็ม',
      'ICF & Assent เอกสารชี้แจงและยินยอม',
      'Investigator Brochure (IB) หรือเอกสารกำกับยา',
      'แผนการรายงาน SAE / SUSAR'
    ],
    dlTab: 'clinical'
  }
};

function selectWizardType(typeKey, cardElement) {
  const cards = document.querySelectorAll('.wizard-opt-card');
  cards.forEach(card => card.classList.remove('active'));

  if (cardElement) {
    cardElement.classList.add('active');
  }

  const data = wizardData[typeKey] || wizardData['exemption'];
  const resultBox = document.getElementById('wizardResultBox');
  if (!resultBox) return;

  const pointsHtml = data.points.map(pt => `<li><i class="fa-solid fa-check"></i> <span>${pt}</span></li>`).join('');
  const formsHtml = data.forms.map(fm => `<span class="form-pill"><i class="fa-solid fa-file-lines"></i> ${fm}</span>`).join('');

  resultBox.innerHTML = `
    <div class="wiz-res-header">
      <div class="wiz-res-title-wrap">
        <span class="wiz-res-badge ${data.badgeClass}">${data.badgeText}</span>
        <h4 class="wiz-res-title">${data.title}</h4>
      </div>
      <div class="wiz-res-time">
        <i class="fa-regular fa-clock"></i>
        <span>ระยะเวลา: ${data.timeText}</span>
      </div>
    </div>

    <div class="wiz-res-body-grid">
      <div class="wiz-criteria">
        <h5><i class="fa-solid fa-circle-info" style="color: var(--primary-green);"></i> เกณฑ์การพิจารณา</h5>
        <p>${data.description}</p>
        <ul class="wiz-points">
          ${pointsHtml}
        </ul>
      </div>

      <div class="wiz-forms-needed">
        <h5><i class="fa-solid fa-list-check" style="color: var(--primary-green);"></i> ชุดแบบฟอร์มสำคัญที่ต้องเตรียม</h5>
        <div class="wiz-form-pills">
          ${formsHtml}
        </div>
        <div class="wiz-actions">
          <a href="#categorized-forms" onclick="switchFormTab('${data.dlTab}', document.querySelector('.form-tab-btn[onclick*=\\'${data.dlTab}\\']'))" class="btn-primary-pill" style="padding: 9px 18px; font-size: 0.88rem;">
            <i class="fa-solid fa-download"></i>
            <span>ไปที่หมวดดาวน์โหลดแบบฟอร์มนี้</span>
          </a>
          <a href="https://sites.google.com/nmu.ac.th/vajirairb/แบบฟอรม/virb-smart-checklist" target="_blank" rel="noopener" class="btn-secondary-pill" style="padding: 9px 16px; font-size: 0.88rem;">
            <i class="fa-solid fa-list-check"></i>
            <span>Smart Checklist</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function switchFormTab(tabKey, buttonElement) {
  const buttons = document.querySelectorAll('.form-tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (buttonElement) {
    buttonElement.classList.add('active');
  }

  const panels = document.querySelectorAll('.form-tab-panel');
  panels.forEach(p => p.classList.remove('active'));

  const targetPanel = document.getElementById('tab-' + tabKey);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
}
