"use client";

import { MOCK_USER_SUBSCRIPTIONS } from "@/src/entities/subscription/model/constants";
import { updateUserSubscriptions } from "@/src/features/subscription/api";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategorySelector } from "./CategorySelector";

export default function CategorySideSheet() {
  const router = useRouter();
  const [show, setShow] = useState(true);

  const handleSubscriptionUpdate = async (
    newSubscriptions: typeof MOCK_USER_SUBSCRIPTIONS,
  ) => {
    try {
      const result = await updateUserSubscriptions(newSubscriptions);

      if (result.success) {
        console.log("구독 업데이트 성공");
      } else {
        console.error("구독 업데이트 실패:", result.error);
      }
    } catch (error) {
      console.error("구독 업데이트 중 오류:", error);
    }
  };

  const handleClose = () => {
    setShow(false); // 애니메이션 시작
  };

  const handleExitComplete = () => {
    router.back(); // 애니메이션 완료 후 라우터 이동
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {show && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 120,
                duration: 0.4,
              },
            }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: {
                type: "tween",
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            className="fixed bottom-4 right-4 top-4 z-50 w-full max-w-[840px] rounded-md bg-background shadow-lg"
            style={{
              willChange: "transform, opacity",
            }}
          >
            {/* 카테고리 선택 컨텐츠 */}
            <CategorySelector
              onClose={handleClose}
              currentSubscriptions={MOCK_USER_SUBSCRIPTIONS}
              onSubscriptionUpdate={handleSubscriptionUpdate}
              showCloseButton={true}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
