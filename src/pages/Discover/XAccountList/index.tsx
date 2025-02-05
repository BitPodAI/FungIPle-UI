import React, { useEffect, useState } from 'react';
import { SearchInput } from '../SearchInput';
import PixBorder from '@/components/common/PixBorder';
import topImg from '@/assets/images/border-bg/top.png';
import bottomImg from '@/assets/images/border-bg/bottom.png';
import leftImg from '@/assets/images/border-bg/left.png';
import rightImg from '@/assets/images/border-bg/right.png';
import { XUserProfile } from '@/types/account';
import defaultAvatar from '@/assets/images/chat/avatar.png';
import PixLoading from '@/components/common/PixLoading';
import { authService } from '@/services/auth';
import { useUserStore } from '@/stores/useUserStore';
import { WatchItem } from '@/types/auth';
import { useGetXList } from '../hook/useGetXList';

import './index.less';

const XAccountList: React.FC = () => {
  const { userProfile, setUserProfile } = useUserStore();
  const { xList, loading, searchUser, setXList } = useGetXList();
  const [focus, setFocus] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>, account: XUserProfile) => {
    e.stopPropagation();
    if (userProfile) {
      const originTwitterWatchList = userProfile.twitterWatchList || [];
      let tempTwitterWatchList = [] as WatchItem[];
      if (account.isWatched) {
        tempTwitterWatchList = originTwitterWatchList?.filter(item => item.username !== account.username);
      } else {
        originTwitterWatchList.push({ username: account.username, name: account.name, tags: account.tags, avatar: account.avatar });
        tempTwitterWatchList = [...originTwitterWatchList];
      }
      const params = {
        ...userProfile,
        twitterWatchList: tempTwitterWatchList,
      };
      await authService.updateProfile(userProfile?.userId, params);
      setUserProfile(params);
      setXList(
        xList.map(item => {
          if (item.username === account.username) {
            item.isWatched = !item.isWatched;
          }
          return {
            ...item,
          };
        })
      );
    } else {
      console.log('userProfile', userProfile);
    }
  };

  return (
    <div className="relative w-100 border border-gray-300 mx-4">
      <PixBorder
        top={topImg}
        bottom={bottomImg}
        left={leftImg}
        right={rightImg}
        className="bg-transparent py-0 px-6px mx-0 mb-0"
        height={42}
        width={8}
      >
        <SearchInput
          onFocus={() => setFocus(true)}
          onSearch={searchUser}
          className="box-border w-full h-42px flex items-center justify-between border border-gray-600 rounded-md"
        />
      </PixBorder>
      {/* watch list */}
      <div
        className="watch-list"
        onClick={() => {
          setFocus(false);
        }}
      >
        {userProfile?.twitterWatchList?.map(account => (
          <div className="watch-list-item" key={account.username}>
            <img
              className="watch-list-item-avatar"
              src={account.avatar}
              alt={account.name}
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.onerror = null;
                img.src = defaultAvatar;
              }}
            />
            <div className="watch-list-item-detail">
              <div className="watch-list-item-detail-header">
                <div className="watch-list-item-detail-header-title">{account.name}</div>
              </div>
              <div className="watch-list-item-detail-footer">@{account.username}</div>
            </div>
            <div className={`watch-list-item-btn btn-scale`} onClick={e => handleClick(e, { ...account, isWatched: true })}>
              UnFollow
            </div>
          </div>
        ))}
      </div>

      {/* search list */}
      {((focus && xList.length) || loading) && (
        <div className="search-list">
          {loading ? (
            <div className="relative w-full frc-center">
              <PixLoading />
            </div>
          ) : (
            xList.map(account => (
              <div className="watch-list-item" key={account.username}>
                <img
                  className="watch-list-item-avatar"
                  src={account.avatar}
                  alt={account.name}
                  onError={e => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    img.src = defaultAvatar;
                  }}
                />
                <div className="watch-list-item-detail">
                  <div className="watch-list-item-detail-header">
                    <div className="watch-list-item-detail-header-title">{account.name}</div>
                  </div>
                  <div className="watch-list-item-detail-footer">@{account.username}</div>
                </div>
                <div
                  className={`${!account.isWatched && 'watch-list-item-btn-active'} watch-list-item-btn btn-scale`}
                  onClick={e => handleClick(e, account)}
                >
                  {account.isWatched ? 'UnFollow' : 'Follow'}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(XAccountList);
