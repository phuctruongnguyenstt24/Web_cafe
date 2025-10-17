    // JavaScript riêng cho trang Jobs
    const jobDetails = {
      barista: {
        title: "Barista Chuyên Nghiệp",
        description: "Chúng tôi đang tìm kiếm những Barista đam mê cà phê và mong muốn phát triển trong ngành F&B.",
        requirements: [
          "Hiểu biết về các loại cà phê và kỹ thuật pha chế cơ bản",
          "Có tinh thần trách nhiệm và đam mê học hỏi",
          "Kỹ năng giao tiếp tốt, thân thiện với khách hàng",
          "Có thể làm việc theo ca linh hoạt (sáng/chiều/tối)"
        ],
        benefits: [
          "Lương cơ bản: 6-8 triệu/tháng",
          "Thưởng doanh thu và thưởng dịch vụ",
          "Đào tạo chuyên sâu về cà phê và kỹ thuật pha chế",
          "Môi trường làm việc trẻ trung, năng động",
          "Cơ hội thăng tiến lên vị trí Quản lý"
        ]
      },
      thungan: {
        title: "Nhân Viên Thu Ngân",
        description: "Vị trí thu ngân đòi hỏi sự cẩn thận, trung thực và khả năng giao tiếp tốt với khách hàng.",
        requirements: [
          "Tốt nghiệp THPT trở lên",
          "Có kinh nghiệm thu ngân là một lợi thế",
          "Thành thạo máy tính và các phần mềm bán hàng",
          "Cẩn thận, trung thực và có trách nhiệm"
        ],
        benefits: [
          "Lương cơ bản: 5-7 triệu/tháng",
          "Thưởng theo hiệu suất làm việc",
          "Được đào tạo sử dụng hệ thống POS",
          "Làm việc trong môi trường chuyên nghiệp",
          "Chế độ phúc lợi đầy đủ theo luật lao động"
        ]
      },
      phucvu: {
        title: "Nhân Viên Phục Vụ",
        description: "Vị trí phục vụ phù hợp với những bạn trẻ năng động, thích giao tiếp và chăm sóc khách hàng.",
        requirements: [
          "Thân thiện, năng động, nhiệt tình",
          "Không yêu cầu kinh nghiệm (sẽ được đào tạo)",
          "Có thể làm việc theo ca linh hoạt",
          "Có tinh thần trách nhiệm và làm việc nhóm"
        ],
        benefits: [
          "Lương cơ bản: 4-6 triệu/tháng",
          "Tip từ khách hàng",
          "Đào tạo kỹ năng phục vụ chuyên nghiệp",
          "Làm việc trong môi trường trẻ trung",
          "Cơ hội phát triển lên các vị trí cao hơn"
        ]
      },
      phache: {
        title: "Nhân Viên Pha Chế",
        description: "Chúng tôi cần những người có đam mê sáng tạo và kỹ năng pha chế để tạo ra những thức uống độc đáo.",
        requirements: [
          "Có ít nhất 6 tháng kinh nghiệm pha chế",
          "Sáng tạo, có gu thẩm mỹ tốt",
          "Hiểu biết về nguyên liệu và kỹ thuật pha chế",
          "Có thể làm việc dưới áp lực cao"
        ],
        benefits: [
          "Lương cơ bản: 7-10 triệu/tháng",
          "Thưởng theo doanh thu đồ uống",
          "Được sáng tạo công thức mới",
          "Tham gia các khóa đào tạo nâng cao",
          "Cơ hội trở thành Quản lý pha chế"
        ]
      }
    };

    // Xử lý modal job details
    document.addEventListener('DOMContentLoaded', function() {
      const jobModal = document.getElementById('jobDetailModal');
      
      jobModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const jobType = button.getAttribute('data-job');
        const job = jobDetails[jobType];
        
        const modalContent = document.getElementById('jobDetailContent');
        modalContent.innerHTML = `
          <h4 class="text-primary mb-4">${job.title}</h4>
          <p class="lead mb-4">${job.description}</p>
          
          <div class="row">
            <div class="col-md-6">
              <h5 class="mb-3"><i class="fas fa-list-check me-2 text-success"></i>Yêu Cầu Công Việc</h5>
              <ul class="list-unstyled">
                ${job.requirements.map(req => `<li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>${req}</li>`).join('')}
              </ul>
            </div>
            <div class="col-md-6">
              <h5 class="mb-3"><i class="fas fa-gift me-2 text-warning"></i>Quyền Lợi</h5>
              <ul class="list-unstyled">
                ${job.benefits.map(benefit => `<li class="mb-2"><i class="fas fa-star text-warning me-2"></i>${benefit}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="alert alert-info mt-4">
            <h6><i class="fas fa-info-circle me-2"></i>Thông tin ứng tuyển:</h6>
            <p class="mb-1">- Ứng viên vui lòng gửi CV đến email: tuyendung@chillcafe.vn</p>
            <p class="mb-0">- Tiêu đề email: [Vị trí ứng tuyển] - [Họ tên]</p>
          </div>
        `;
      });
    });

    function applyForJob() {
      alert('Cảm ơn bạn đã quan tâm! Vui lòng gửi CV đến email: tuyendung@chillcafe.vn');
      const modal = bootstrap.Modal.getInstance(document.getElementById('jobDetailModal'));
      modal.hide();
    }