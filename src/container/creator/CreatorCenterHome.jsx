import React, { memo } from "react";
import images from "../../assets/imgExport"

const {new_comment, user} = images

const CreatorCenterHome = () => {
   return (
      <main className="creator-home row">
         <div className="creator-home__wrapper row">
            <div className="detail-box row">
               <div className="detail-box__heading row">
                  <div className="row">
                     <h3>Số liệu chính</h3>
                     <p>7 ngày gần nhất</p>
                  </div>
                  <span>Hiện tất cả</span>
               </div>
               <div className="detail-box__content row">
                    <h4>Không có thông tin chuyên sâu nào</h4>
                    <p>Bạn chưa tạo bài đăng nào. Hãy kiểm tra lại sau khi bạn đã tải lên video công khai đầu tiên.</p>
               </div>
            </div>
            <div className="new-comment row">
                <h4>Bình luận mới nhất</h4>
                <div className="new-comment__detail row">
                    <img src={new_comment} alt="tiktok" />
                    <h4>Chưa có bình luận nào</h4>
                    <p>Bình luận mới nhất sẽ xuất hiện ở đây.</p>
                </div>
            </div>
         </div>
         <aside className="creator-home__info">
            <div className="info-user">
                <div className="info-user__detail row">
                    <img src={user} alt="" />
                    <span>user name</span>
                </div>
                <div className="info-user__interact row">
                    <div className="interact__item row">
                        <span>Đang Follow</span>
                        <small>23</small>
                    </div>
                    <div className="interact__item row">
                        <span>Follower</span>
                        <small>87</small>
                    </div>
                    <div className="interact__item row">
                        <span>Lượt thích</span>
                        <small>92</small>
                    </div>
                </div>
            </div>
         </aside>
      </main>
   );
};

export default memo(CreatorCenterHome);
