<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="css/custom.css">
</head>

<body>
  <canvas id="World"   width="800" height="600"></canvas>
  <canvas id="Physics" width="800" height="600"></canvas>
  <canvas id="Debug"   width="200" height="450"></canvas>




  <!-- DEPENDENCIES -->
  <script type="text/javascript" src="js/dependencies/jQuery.js"></script>
  <script type="text/javascript" src="js/dependencies/matter.js"></script>
  <script type="text/javascript" src="js/dependencies/StateMachine.js"></script>
  <script type="text/javascript" src="assets/kontra.js"></script>

  <!-- UTILITIES -->
  <script type="text/javascript" src="js/utilities/Utilities.js"></script>
  <script type="text/javascript" src="js/utilities/Mouse.js"></script>
  <script type="text/javascript" src="js/utilities/Keyboard.js"></script>

  <!-- ASSET LOADERS -->
  <script type="text/javascript" src="js/utilities/asset_loaders/ImageLoader.js"></script>
  <script type="text/javascript" src="js/utilities/asset_loaders/JsonLoader.js"></script>

  <!-- GAME -->
  <script type="text/javascript" src="js/game/Game.js"></script>
  <script type="text/javascript" src="js/game/GlobalEvent.js"></script>
  <script type="text/javascript" src="js/game/GlobalObjects.js"></script>

  <!-- INTERNAL LIBRARIES -->
  <script type="text/javascript" src="js/game/object_libraries/ActorLib.js"></script>
  <script type="text/javascript" src="js/game/object_libraries/MapLib.js"></script>

  <!-- ENTITY COMPONENT SYSTEM -->
  <script type="text/javascript" src="js/ecs/ECS.js"></script>
  <script type="text/javascript" src="js/ecs/Forge.js"></script>

  <!-- COMPONENTS -->
  <script type="text/javascript" src="js/ecs/components/backend/body/ActorBody.js"></script>
  <script type="text/javascript" src="js/ecs/components/backend/body/MapBody.js"></script>

  <script type="text/javascript" src="js/ecs/components/backend/map/MapData.js"></script>
  <script type="text/javascript" src="js/ecs/components/backend/map/Portal.js"></script>

  <script type="text/javascript" src="js/ecs/components/backend/trigger/ActorTriggers.js"></script>

  <script type="text/javascript" src="js/ecs/components/frontend/visual/Camera.js"></script>
  <script type="text/javascript" src="js/ecs/components/frontend/visual/Render.js"></script>
  <script type="text/javascript" src="js/ecs/components/frontend/visual/Sprite.js"></script>
  <script type="text/javascript" src="js/ecs/components/frontend/visual/Transform.js"></script>

  <script type="text/javascript" src="js/ecs/components/frontend/visual/dialog/DialogScript.js"></script>

  <!-- FSMs -->
  <script type="text/javascript" src="js/fsm/world/actor/body/BaseBodyFSM.js"></script>

  <!-- SYSTEMS -->
  <script type="text/javascript" src="js/ecs/systems/backend/map/PortalSystem.js"></script>

  <script type="text/javascript" src="js/ecs/systems/backend/triggers/InteractSystem.js"></script>

  <script type="text/javascript" src="js/ecs/systems/frontend/visual/AnimateSystem.js"></script>
  <script type="text/javascript" src="js/ecs/systems/frontend/visual/CameraSystem.js"></script>
  <script type="text/javascript" src="js/ecs/systems/frontend/visual/RenderSystem.js"></script>


  <!-- MANAGERS -->
  <script type="text/javascript" src="js/managers/DialogManager.js"></script>
  <script type="text/javascript" src="js/managers/MapManager.js"></script>
  <script type="text/javascript" src="js/managers/InputManager.js"></script>

  <script>
    window.addEventListener('load', function(){ game.start(); }, false);
  </script>

</body>
</html>
