export type QuestMoteDataPointer = `data/${QuestMotePointer}`;
export type QuestMotePointer = ``
  | `clues/${string}/element/phrases/${string}/element/phrase/emoji`
  | `clues/${string}/element/phrases/${string}/element/phrase/text/text`
  | `clues/${string}/element/phrases/${string}/element/phrase/text`
  | `clues/${string}/element/phrases/${string}/element/phrase`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/area`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/artisan`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/boss`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comfort_status`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comfort`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons/${string}/element/comparison`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons/${string}/element/value0`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons/${string}/element/value1`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons/${string}/element`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons/${string}/order`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons/${string}`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/comparisons`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/following`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/group_requirements/${string}/recursion(cl2_quest_requirement)`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/group_requirements`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/infusion_status`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/infusion`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/insight_status`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/insight`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/invert`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/item_id`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/item`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/items_owned/${string}/element/key`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/items_owned/${string}/element/value`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/items_owned/${string}/element`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/items_owned/${string}/order`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/items_owned/${string}`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/items_owned`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/pet`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/quest_status`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/quest`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/require_all`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/stage/comparison`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/stage/stage`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/stage`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/style`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/teleporter_active`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/teleporter_area`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element/time`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/element`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}/order`
  | `clues/${string}/element/phrases/${string}/element/requirements/${string}`
  | `clues/${string}/element/phrases/${string}/element/requirements`
  | `clues/${string}/element/phrases/${string}/element`
  | `clues/${string}/element/phrases/${string}/order`
  | `clues/${string}/element/phrases/${string}`
  | `clues/${string}/element/phrases`
  | `clues/${string}/element/speaker`
  | `clues/${string}/element`
  | `clues/${string}/order`
  | `clues/${string}`
  | `clues`
  | `ignore_in_progression_map`
  | `item_highlights/${string}/element`
  | `item_highlights/${string}/order`
  | `item_highlights/${string}`
  | `item_highlights`
  | `map_markers/${string}/element/marker`
  | `map_markers/${string}/element/radius`
  | `map_markers/${string}/element/text/text`
  | `map_markers/${string}/element/text`
  | `map_markers/${string}/element`
  | `map_markers/${string}/order`
  | `map_markers/${string}`
  | `map_markers`
  | `marker_world_text/${string}/element/color/b`
  | `marker_world_text/${string}/element/color/g`
  | `marker_world_text/${string}/element/color/r`
  | `marker_world_text/${string}/element/color`
  | `marker_world_text/${string}/element/marker`
  | `marker_world_text/${string}/element/proximity`
  | `marker_world_text/${string}/element/sprite`
  | `marker_world_text/${string}/element/text/description`
  | `marker_world_text/${string}/element/text/text`
  | `marker_world_text/${string}/element/text`
  | `marker_world_text/${string}/element`
  | `marker_world_text/${string}/order`
  | `marker_world_text/${string}`
  | `marker_world_text`
  | `name`
  | `order`
  | `pet_quest/name/text`
  | `pet_quest/name`
  | `pet_quest/pet_stage`
  | `pet_quest/pet`
  | `pet_quest`
  | `priors/${string}/element`
  | `priors/${string}/order`
  | `priors/${string}`
  | `priors`
  | `quest_end_moments/${string}/element/area`
  | `quest_end_moments/${string}/element/artisan`
  | `quest_end_moments/${string}/element/bonus`
  | `quest_end_moments/${string}/element/camera_target`
  | `quest_end_moments/${string}/element/drops/${string}/element/dropper`
  | `quest_end_moments/${string}/element/drops/${string}/element/items/${string}/element/item_id`
  | `quest_end_moments/${string}/element/drops/${string}/element/items/${string}/element/quantity`
  | `quest_end_moments/${string}/element/drops/${string}/element/items/${string}/element`
  | `quest_end_moments/${string}/element/drops/${string}/element/items/${string}/order`
  | `quest_end_moments/${string}/element/drops/${string}/element/items/${string}`
  | `quest_end_moments/${string}/element/drops/${string}/element/items`
  | `quest_end_moments/${string}/element/drops/${string}/element`
  | `quest_end_moments/${string}/element/drops/${string}/order`
  | `quest_end_moments/${string}/element/drops/${string}`
  | `quest_end_moments/${string}/element/drops`
  | `quest_end_moments/${string}/element/emotes/${string}/element/key`
  | `quest_end_moments/${string}/element/emotes/${string}/element/value`
  | `quest_end_moments/${string}/element/emotes/${string}/element`
  | `quest_end_moments/${string}/element/emotes/${string}/order`
  | `quest_end_moments/${string}/element/emotes/${string}`
  | `quest_end_moments/${string}/element/emotes`
  | `quest_end_moments/${string}/element/items/${string}/element/key`
  | `quest_end_moments/${string}/element/items/${string}/element/value`
  | `quest_end_moments/${string}/element/items/${string}/element`
  | `quest_end_moments/${string}/element/items/${string}/order`
  | `quest_end_moments/${string}/element/items/${string}`
  | `quest_end_moments/${string}/element/items`
  | `quest_end_moments/${string}/element/pause_duration`
  | `quest_end_moments/${string}/element/pin`
  | `quest_end_moments/${string}/element/quest_to_close`
  | `quest_end_moments/${string}/element/requirements/${string}/element/area`
  | `quest_end_moments/${string}/element/requirements/${string}/element/artisan`
  | `quest_end_moments/${string}/element/requirements/${string}/element/boss`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comfort_status`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comfort`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element/comparison`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element/value0`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element/value1`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons/${string}/order`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons/${string}`
  | `quest_end_moments/${string}/element/requirements/${string}/element/comparisons`
  | `quest_end_moments/${string}/element/requirements/${string}/element/distance`
  | `quest_end_moments/${string}/element/requirements/${string}/element/exclusive`
  | `quest_end_moments/${string}/element/requirements/${string}/element/following`
  | `quest_end_moments/${string}/element/requirements/${string}/element/group_requirements/${string}/recursion(cl2_quest_moment_requirement)`
  | `quest_end_moments/${string}/element/requirements/${string}/element/group_requirements`
  | `quest_end_moments/${string}/element/requirements/${string}/element/infusion_status`
  | `quest_end_moments/${string}/element/requirements/${string}/element/infusion`
  | `quest_end_moments/${string}/element/requirements/${string}/element/insight_status`
  | `quest_end_moments/${string}/element/requirements/${string}/element/insight`
  | `quest_end_moments/${string}/element/requirements/${string}/element/invert`
  | `quest_end_moments/${string}/element/requirements/${string}/element/item_id`
  | `quest_end_moments/${string}/element/requirements/${string}/element/item_ids/${string}/element`
  | `quest_end_moments/${string}/element/requirements/${string}/element/item_ids/${string}/order`
  | `quest_end_moments/${string}/element/requirements/${string}/element/item_ids/${string}`
  | `quest_end_moments/${string}/element/requirements/${string}/element/item_ids`
  | `quest_end_moments/${string}/element/requirements/${string}/element/item`
  | `quest_end_moments/${string}/element/requirements/${string}/element/items_owned/${string}/element/key`
  | `quest_end_moments/${string}/element/requirements/${string}/element/items_owned/${string}/element/value`
  | `quest_end_moments/${string}/element/requirements/${string}/element/items_owned/${string}/element`
  | `quest_end_moments/${string}/element/requirements/${string}/element/items_owned/${string}/order`
  | `quest_end_moments/${string}/element/requirements/${string}/element/items_owned/${string}`
  | `quest_end_moments/${string}/element/requirements/${string}/element/items_owned`
  | `quest_end_moments/${string}/element/requirements/${string}/element/pet`
  | `quest_end_moments/${string}/element/requirements/${string}/element/quest_status`
  | `quest_end_moments/${string}/element/requirements/${string}/element/quest`
  | `quest_end_moments/${string}/element/requirements/${string}/element/require_all`
  | `quest_end_moments/${string}/element/requirements/${string}/element/same_room`
  | `quest_end_moments/${string}/element/requirements/${string}/element/stage/comparison`
  | `quest_end_moments/${string}/element/requirements/${string}/element/stage/stage`
  | `quest_end_moments/${string}/element/requirements/${string}/element/stage`
  | `quest_end_moments/${string}/element/requirements/${string}/element/style`
  | `quest_end_moments/${string}/element/requirements/${string}/element/teleporter_active`
  | `quest_end_moments/${string}/element/requirements/${string}/element/teleporter_area`
  | `quest_end_moments/${string}/element/requirements/${string}/element/time`
  | `quest_end_moments/${string}/element/requirements/${string}/element`
  | `quest_end_moments/${string}/element/requirements/${string}/order`
  | `quest_end_moments/${string}/element/requirements/${string}`
  | `quest_end_moments/${string}/element/requirements`
  | `quest_end_moments/${string}/element/speech/emotion`
  | `quest_end_moments/${string}/element/speech/speaker`
  | `quest_end_moments/${string}/element/speech/text/text`
  | `quest_end_moments/${string}/element/speech/text`
  | `quest_end_moments/${string}/element/speech`
  | `quest_end_moments/${string}/element/style`
  | `quest_end_moments/${string}/element/zoom_amount`
  | `quest_end_moments/${string}/element`
  | `quest_end_moments/${string}/order`
  | `quest_end_moments/${string}`
  | `quest_end_moments`
  | `quest_end_requirements/${string}/element/area`
  | `quest_end_requirements/${string}/element/artisan`
  | `quest_end_requirements/${string}/element/boss`
  | `quest_end_requirements/${string}/element/comfort_status`
  | `quest_end_requirements/${string}/element/comfort`
  | `quest_end_requirements/${string}/element/comparisons/${string}/element/comparison`
  | `quest_end_requirements/${string}/element/comparisons/${string}/element/value0`
  | `quest_end_requirements/${string}/element/comparisons/${string}/element/value1`
  | `quest_end_requirements/${string}/element/comparisons/${string}/element`
  | `quest_end_requirements/${string}/element/comparisons/${string}/order`
  | `quest_end_requirements/${string}/element/comparisons/${string}`
  | `quest_end_requirements/${string}/element/comparisons`
  | `quest_end_requirements/${string}/element/following`
  | `quest_end_requirements/${string}/element/group_requirements/${string}/recursion(cl2_quest_requirement)`
  | `quest_end_requirements/${string}/element/group_requirements`
  | `quest_end_requirements/${string}/element/infusion_status`
  | `quest_end_requirements/${string}/element/infusion`
  | `quest_end_requirements/${string}/element/insight_status`
  | `quest_end_requirements/${string}/element/insight`
  | `quest_end_requirements/${string}/element/invert`
  | `quest_end_requirements/${string}/element/item_id`
  | `quest_end_requirements/${string}/element/item`
  | `quest_end_requirements/${string}/element/items_owned/${string}/element/key`
  | `quest_end_requirements/${string}/element/items_owned/${string}/element/value`
  | `quest_end_requirements/${string}/element/items_owned/${string}/element`
  | `quest_end_requirements/${string}/element/items_owned/${string}/order`
  | `quest_end_requirements/${string}/element/items_owned/${string}`
  | `quest_end_requirements/${string}/element/items_owned`
  | `quest_end_requirements/${string}/element/pet`
  | `quest_end_requirements/${string}/element/quest_status`
  | `quest_end_requirements/${string}/element/quest`
  | `quest_end_requirements/${string}/element/require_all`
  | `quest_end_requirements/${string}/element/stage/comparison`
  | `quest_end_requirements/${string}/element/stage/stage`
  | `quest_end_requirements/${string}/element/stage`
  | `quest_end_requirements/${string}/element/style`
  | `quest_end_requirements/${string}/element/teleporter_active`
  | `quest_end_requirements/${string}/element/teleporter_area`
  | `quest_end_requirements/${string}/element/time`
  | `quest_end_requirements/${string}/element`
  | `quest_end_requirements/${string}/order`
  | `quest_end_requirements/${string}`
  | `quest_end_requirements`
  | `quest_giver/interaction_target`
  | `quest_giver/item`
  | `quest_giver/proximity`
  | `quest_giver/same_room`
  | `quest_giver/show_on_map`
  | `quest_giver`
  | `quest_receiver/interaction_target`
  | `quest_receiver/item`
  | `quest_receiver/proximity`
  | `quest_receiver/same_room`
  | `quest_receiver/show_on_map`
  | `quest_receiver`
  | `quest_start_log/text`
  | `quest_start_log`
  | `quest_start_moments/${string}/element/area`
  | `quest_start_moments/${string}/element/artisan`
  | `quest_start_moments/${string}/element/bonus`
  | `quest_start_moments/${string}/element/camera_target`
  | `quest_start_moments/${string}/element/drops/${string}/element/dropper`
  | `quest_start_moments/${string}/element/drops/${string}/element/items/${string}/element/item_id`
  | `quest_start_moments/${string}/element/drops/${string}/element/items/${string}/element/quantity`
  | `quest_start_moments/${string}/element/drops/${string}/element/items/${string}/element`
  | `quest_start_moments/${string}/element/drops/${string}/element/items/${string}/order`
  | `quest_start_moments/${string}/element/drops/${string}/element/items/${string}`
  | `quest_start_moments/${string}/element/drops/${string}/element/items`
  | `quest_start_moments/${string}/element/drops/${string}/element`
  | `quest_start_moments/${string}/element/drops/${string}/order`
  | `quest_start_moments/${string}/element/drops/${string}`
  | `quest_start_moments/${string}/element/drops`
  | `quest_start_moments/${string}/element/emotes/${string}/element/key`
  | `quest_start_moments/${string}/element/emotes/${string}/element/value`
  | `quest_start_moments/${string}/element/emotes/${string}/element`
  | `quest_start_moments/${string}/element/emotes/${string}/order`
  | `quest_start_moments/${string}/element/emotes/${string}`
  | `quest_start_moments/${string}/element/emotes`
  | `quest_start_moments/${string}/element/items/${string}/element/key`
  | `quest_start_moments/${string}/element/items/${string}/element/value`
  | `quest_start_moments/${string}/element/items/${string}/element`
  | `quest_start_moments/${string}/element/items/${string}/order`
  | `quest_start_moments/${string}/element/items/${string}`
  | `quest_start_moments/${string}/element/items`
  | `quest_start_moments/${string}/element/pause_duration`
  | `quest_start_moments/${string}/element/pin`
  | `quest_start_moments/${string}/element/quest_to_close`
  | `quest_start_moments/${string}/element/requirements/${string}/element/area`
  | `quest_start_moments/${string}/element/requirements/${string}/element/artisan`
  | `quest_start_moments/${string}/element/requirements/${string}/element/boss`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comfort_status`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comfort`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element/comparison`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element/value0`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element/value1`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons/${string}/element`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons/${string}/order`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons/${string}`
  | `quest_start_moments/${string}/element/requirements/${string}/element/comparisons`
  | `quest_start_moments/${string}/element/requirements/${string}/element/distance`
  | `quest_start_moments/${string}/element/requirements/${string}/element/exclusive`
  | `quest_start_moments/${string}/element/requirements/${string}/element/following`
  | `quest_start_moments/${string}/element/requirements/${string}/element/group_requirements/${string}/recursion(cl2_quest_moment_requirement)`
  | `quest_start_moments/${string}/element/requirements/${string}/element/group_requirements`
  | `quest_start_moments/${string}/element/requirements/${string}/element/infusion_status`
  | `quest_start_moments/${string}/element/requirements/${string}/element/infusion`
  | `quest_start_moments/${string}/element/requirements/${string}/element/insight_status`
  | `quest_start_moments/${string}/element/requirements/${string}/element/insight`
  | `quest_start_moments/${string}/element/requirements/${string}/element/invert`
  | `quest_start_moments/${string}/element/requirements/${string}/element/item_id`
  | `quest_start_moments/${string}/element/requirements/${string}/element/item_ids/${string}/element`
  | `quest_start_moments/${string}/element/requirements/${string}/element/item_ids/${string}/order`
  | `quest_start_moments/${string}/element/requirements/${string}/element/item_ids/${string}`
  | `quest_start_moments/${string}/element/requirements/${string}/element/item_ids`
  | `quest_start_moments/${string}/element/requirements/${string}/element/item`
  | `quest_start_moments/${string}/element/requirements/${string}/element/items_owned/${string}/element/key`
  | `quest_start_moments/${string}/element/requirements/${string}/element/items_owned/${string}/element/value`
  | `quest_start_moments/${string}/element/requirements/${string}/element/items_owned/${string}/element`
  | `quest_start_moments/${string}/element/requirements/${string}/element/items_owned/${string}/order`
  | `quest_start_moments/${string}/element/requirements/${string}/element/items_owned/${string}`
  | `quest_start_moments/${string}/element/requirements/${string}/element/items_owned`
  | `quest_start_moments/${string}/element/requirements/${string}/element/pet`
  | `quest_start_moments/${string}/element/requirements/${string}/element/quest_status`
  | `quest_start_moments/${string}/element/requirements/${string}/element/quest`
  | `quest_start_moments/${string}/element/requirements/${string}/element/require_all`
  | `quest_start_moments/${string}/element/requirements/${string}/element/same_room`
  | `quest_start_moments/${string}/element/requirements/${string}/element/stage/comparison`
  | `quest_start_moments/${string}/element/requirements/${string}/element/stage/stage`
  | `quest_start_moments/${string}/element/requirements/${string}/element/stage`
  | `quest_start_moments/${string}/element/requirements/${string}/element/style`
  | `quest_start_moments/${string}/element/requirements/${string}/element/teleporter_active`
  | `quest_start_moments/${string}/element/requirements/${string}/element/teleporter_area`
  | `quest_start_moments/${string}/element/requirements/${string}/element/time`
  | `quest_start_moments/${string}/element/requirements/${string}/element`
  | `quest_start_moments/${string}/element/requirements/${string}/order`
  | `quest_start_moments/${string}/element/requirements/${string}`
  | `quest_start_moments/${string}/element/requirements`
  | `quest_start_moments/${string}/element/speech/emotion`
  | `quest_start_moments/${string}/element/speech/speaker`
  | `quest_start_moments/${string}/element/speech/text/text`
  | `quest_start_moments/${string}/element/speech/text`
  | `quest_start_moments/${string}/element/speech`
  | `quest_start_moments/${string}/element/style`
  | `quest_start_moments/${string}/element/zoom_amount`
  | `quest_start_moments/${string}/element`
  | `quest_start_moments/${string}/order`
  | `quest_start_moments/${string}`
  | `quest_start_moments`
  | `quest_start_requirements/${string}/element/area`
  | `quest_start_requirements/${string}/element/artisan`
  | `quest_start_requirements/${string}/element/boss`
  | `quest_start_requirements/${string}/element/comfort_status`
  | `quest_start_requirements/${string}/element/comfort`
  | `quest_start_requirements/${string}/element/comparisons/${string}/element/comparison`
  | `quest_start_requirements/${string}/element/comparisons/${string}/element/value0`
  | `quest_start_requirements/${string}/element/comparisons/${string}/element/value1`
  | `quest_start_requirements/${string}/element/comparisons/${string}/element`
  | `quest_start_requirements/${string}/element/comparisons/${string}/order`
  | `quest_start_requirements/${string}/element/comparisons/${string}`
  | `quest_start_requirements/${string}/element/comparisons`
  | `quest_start_requirements/${string}/element/following`
  | `quest_start_requirements/${string}/element/group_requirements/${string}/recursion(cl2_quest_requirement)`
  | `quest_start_requirements/${string}/element/group_requirements`
  | `quest_start_requirements/${string}/element/infusion_status`
  | `quest_start_requirements/${string}/element/infusion`
  | `quest_start_requirements/${string}/element/insight_status`
  | `quest_start_requirements/${string}/element/insight`
  | `quest_start_requirements/${string}/element/invert`
  | `quest_start_requirements/${string}/element/item_id`
  | `quest_start_requirements/${string}/element/item`
  | `quest_start_requirements/${string}/element/items_owned/${string}/element/key`
  | `quest_start_requirements/${string}/element/items_owned/${string}/element/value`
  | `quest_start_requirements/${string}/element/items_owned/${string}/element`
  | `quest_start_requirements/${string}/element/items_owned/${string}/order`
  | `quest_start_requirements/${string}/element/items_owned/${string}`
  | `quest_start_requirements/${string}/element/items_owned`
  | `quest_start_requirements/${string}/element/pet`
  | `quest_start_requirements/${string}/element/quest_status`
  | `quest_start_requirements/${string}/element/quest`
  | `quest_start_requirements/${string}/element/require_all`
  | `quest_start_requirements/${string}/element/stage/comparison`
  | `quest_start_requirements/${string}/element/stage/stage`
  | `quest_start_requirements/${string}/element/stage`
  | `quest_start_requirements/${string}/element/style`
  | `quest_start_requirements/${string}/element/teleporter_active`
  | `quest_start_requirements/${string}/element/teleporter_area`
  | `quest_start_requirements/${string}/element/time`
  | `quest_start_requirements/${string}/element`
  | `quest_start_requirements/${string}/order`
  | `quest_start_requirements/${string}`
  | `quest_start_requirements`
  | `storyline`
  | `wip/audio`
  | `wip/balance`
  | `wip/comments/${string}/element`
  | `wip/comments/${string}/order`
  | `wip/comments/${string}`
  | `wip/comments`
  | `wip/draft`
  | `wip/integration`
  | `wip/mechanics`
  | `wip/text`
  | `wip/visuals`
  | `wip`;
