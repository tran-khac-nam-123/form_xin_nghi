import React, { useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState({
    tieude: '',
    lydo: '',
    loaixinnghi: '',
    thoigian: '',
    timestart: '',
    timeend: '',
    dimuon: '',
    tongngaynghi: '',
    thongbaocho: '',
    truongbophan: '',
    nguoipheduyet: '',
    khancap: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sharePointUrl = 'https://tsgvietnam.sharepoint.com/sites/dev/CuongTest';
    const accessToken = 'YOUR_ACCESS_TOKEN';

    const item = {
      tieude: data.tieude,
      lydo: data.lydo,
      loaixinnghi: data.loaixinnghi,
      thoigian: data.thoigian,
      timestart: data.timestart,
      timeend: data.timeend,
      dimuon: data.dimuon,
      tongngaynghi: data.tongngaynghi,
      thongbaocho: data.thongbaocho,
      truongbophan: data.truongbophan,
      nguoipheduyet: data.nguoipheduyet,
      khancap: data.khancap
    };

    try {
      const response = await fetch(sharePointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;odata=verbose',
          'Accept': 'application/json;odata=verbose',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ __metadata: { type: 'SP.Data.YourListNameListItem' }, ...item }),
      });

      if (response.ok) {
        alert('Lưu thành công');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Lưu thất bại');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving data to SharePoint');
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h3>XIN NGHỈ PHÉP</h3>
        <a href="#1" className="quytrinh">Quy trình / Xin nghỉ phép</a>
      </div>
      
      <div className="app-content">
        

        <form className="app-form">
          <table>
            <tr>
            <h3>Thông tin chung</h3>
            </tr>
            <tr>
              <td>Tiêu đề*</td>
              <td>Lý do*</td>
            </tr>
            <tr>
              <td><input type="text" className="txtTieuDe"/></td>
              <td><textarea className='txtLyDo1'></textarea></td>
            </tr>
            <tr>
              <td>Loại xin nghỉ*</td>
              <td>Thời gian*</td>
            </tr>
            <tr>
              <td>
                <select className="LoaiXinNghi">
                  <option>--Lựa chọn--</option>
                  <option>Nghỉ không lương</option>
                  <option>Nghỉ phép năm</option>
                  <option>Nghỉ du lịch công ty</option>
                </select>
              </td>
              <td>
                <select className="ThoiGian">
                  <option>--Lựa chọn--</option>
                  <option>Cả ngày</option>
                  <option>Buổi sáng</option>
                  <option>Buổi chiều</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Thời gian bắt đầu*</td>
              <td>Thời gian kết thúc*</td>
            </tr>
            <tr>
              <td><input type="datetime-local" className='TimeStart'/></td>
              <td><input type="datetime-local" className='TimeEnd'/></td>
            </tr>
            <tr>
              <td>Thời gian xin đi muộn/về sớm</td>
              <td>Tổng ngày nghỉ</td>
            </tr>
            <tr>
              <td><input type='text' className='txtDiMuon'/></td>
              <td><input type='text' className='txtTongNgayNghi'/></td>
            </tr>
            <tr>
              <td>Thông báo cho</td>
              <td>Trưởng bộ phận</td>
            </tr>
            <tr>
              <td><input type='text' className='txtThongBaoCho' placeholder='Tìm kiếm người dùng'/></td>
              <td><input type='text' className='txtTruongBoPhan' placeholder='Tìm kiếm người dùng'/></td>
            </tr>
          </table>
        </form>

        <div className='add-file'>
          <p>Tài liệu đính kèm</p>
          <div>
            {/* <input className='select-file' type='file' value='<i class="fa-solid fa-paperclip"></i> Add File'/> */}
            <button type=''><i class="fa-solid fa-paperclip"></i> Add File</button>
          </div>
        </div>

        <form className='app-form'>
          <table>
            <tr>
              <td>Lý do</td>
              <td><textarea className='txtLyDo2'></textarea></td>
            </tr>
            <tr>
              <td>Người phê duyệt</td>
              <td><td><input type='text' className='txtNguoiPheDuyet' placeholder='Tìm kiếm người dùng'/></td></td>
            </tr>
            <tr>
              <td>Trạng thái khẩn cấp</td>
              <td><input type='checkbox' className='checkbox'/></td>
            </tr>
            <tr>
              <td colSpan={2}>
                <a href='#save' className='save'><i class="fa-regular fa-floppy-disk"></i> Lưu</a>
                <a href='#send' className='send'><i class="fa-regular fa-floppy-disk"></i> Gửi đi</a>
                <a href='#reset' className='reset'><i class="fa-solid fa-arrows-rotate"></i> Làm mới</a>
              </td>
            </tr>
          </table>
        </form>


      </div>
    </div>
  );
}

export default App;
