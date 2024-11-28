import { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  // get the client Id from FE
  const { channelId } = req.params;

 

  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiErrors(400, "Provide channel id");
  }

  // make sure subscriber should not subscribe their own channel
  console.log("channelId", channelId)
  console.log("channelId", req.user._id) //new ObjectId('fwe5wf434t4rf43t43frf43').toString() ---> "fwe5wf434t4rf43t43frf43"

  if (channelId === req.user._id.toString()) {
    throw new ApiError(404, "user can not subscribe her/him self");
  }

  // check subScriber already exit or not for same channel
  const chechSubsciberAlreadySubscribe = await Subscription.findOne({
    $and: [{ channel: channelId }, { subscriber: req.user._id }],
  });

  // toggle if subcriber is not subcribe then subcribe it or else unsubcriber
  if (chechSubsciberAlreadySubscribe) {

    const unsubcriber = await Subscription.findByIdAndDelete(
      chechSubsciberAlreadySubscribe._id
    );

    if (!unsubcriber) {
      throw new ApiError(400, "Error while trying to unsubscribe");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Channel has been unsubscribe successfully")
      );
  }

  const subscribe = await Subscription.create({
    channel: channelId,
    subscriber: req.user._id,
  });

  if (!subscribe) {
    throw new ApiError(400, "Error while trying to subscribe channel");
  }

  // res
  return res
  .status(200)
  .json(
    new ApiResponse(200, {}, "Channel has been subscribe successfully")
  );
});

const getSubscribedChannels = asyncHandler(async()=>{
    
})

const getUserChannelSubscribers = asyncHandler(async()=>{})

export { toggleSubscription, getSubscribedChannels,  getUserChannelSubscribers}
