package budkevych.squareapi.mapper;

import budkevych.squareapi.dto.GameCharacterRequestDto;
import budkevych.squareapi.dto.GameCharacterResponseDto;
import budkevych.squareapi.model.GameCharacter;
import org.springframework.stereotype.Component;

@Component
public class GameCharacterMapper {
    public GameCharacterResponseDto toDto(GameCharacter character) {
        GameCharacterResponseDto dto = new GameCharacterResponseDto();
        dto.setId(character.getId());
        dto.setTimestamp(character.getLastUpdate());
        dto.setName(character.getName());
        return dto;
    }

    public GameCharacter toModel(GameCharacterRequestDto dto) {
        GameCharacter gameCharacter = new GameCharacter();
        gameCharacter.setLastUpdate(dto.getTimestamp());
        gameCharacter.setName(dto.getName());
        return gameCharacter;
    }
}